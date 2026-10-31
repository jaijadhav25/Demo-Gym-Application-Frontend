/* ===================================================================
   GymFlow — LocalStorage Demo Data Storage Layer (GymFlowDB)
   Handles initialization, persistence, CRUD operations, and events.
   =================================================================== */

const DB_KEY = 'gymflow_saas_db';
const DEMO_DB_KEY = 'gymflow_admin_dashboard_demo_db';

class StorageManager {
  constructor() {
    this.init();
  }

  init() {
    try {
      const existing = localStorage.getItem(this._activeKey());
      if (!existing && !this.isDemoMode()) {
        this.resetToDefaults();
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled. Operating in-memory.', e);
      this._memoryDb = JSON.parse(JSON.stringify(INITIAL_MOCK_DATA));
    }
  }

  isDemoMode() {
    try {
      const rolePath = window.location.pathname.replace(/\\/g, '/');
      const isDemoPortal = /\/(admin|super-admin|member)\//i.test(rolePath);
      if (!isDemoPortal) return false;
      let mode = sessionStorage.getItem('gymflow_data_mode');
      if (!mode) {
        mode = 'demo';
        sessionStorage.setItem('gymflow_data_mode', mode);
      }
      return mode === 'demo';
    }
    catch (e) { return false; }
  }

  _activeKey() {
    return this.isDemoMode() ? DEMO_DB_KEY : DB_KEY;
  }

  _getDb() {
    try {
      const data = localStorage.getItem(this._activeKey());
      return data ? JSON.parse(data) : (this._memoryDb || INITIAL_MOCK_DATA);
    } catch (e) {
      return this._memoryDb || INITIAL_MOCK_DATA;
    }
  }

  _saveDb(db) {
    try {
      localStorage.setItem(this._activeKey(), JSON.stringify(db));
    } catch (e) {
      console.warn('Error saving to LocalStorage', e);
      this._memoryDb = db;
    }
    // Dispatch reactive change event
    window.dispatchEvent(new CustomEvent('gymflow:data-changed', { detail: { timestamp: Date.now() } }));
  }

  resetToDefaults() {
    try {
      localStorage.setItem(this._activeKey(), JSON.stringify(INITIAL_MOCK_DATA));
    } catch (e) {
      this._memoryDb = JSON.parse(JSON.stringify(INITIAL_MOCK_DATA));
    }
    window.dispatchEvent(new CustomEvent('gymflow:data-changed', { detail: { reset: true } }));
    return true;
  }

  seedDemoData(data) {
    if (!this.isDemoMode()) return false;
    try {
      const existingRaw = localStorage.getItem(DEMO_DB_KEY);
      if (existingRaw) {
        const existing = JSON.parse(existingRaw);
        if ((Number(existing._dashboardDemoVersion) || 0) >= (Number(data._dashboardDemoVersion) || 0)) return false;
        // Upgrade only seeded demo records; preserve records created by the user.
        Object.keys(data).forEach(collection => {
          if (!Array.isArray(data[collection]) || !Array.isArray(existing[collection])) return;
          const seededIds = new Set(data[collection].filter(item => item?.id != null).map(item => String(item.id)));
          const userRecords = existing[collection].filter(item => !item?.demoRecord && !seededIds.has(String(item.id)) && !(collection === 'progressRecords' && item.memberId === 'mem_101' && !item.id));
          const oldUnchangedDemo = existing[collection].filter(item => item?.demoRecord && !seededIds.has(String(item.id)) && !(collection === 'members' && item.id === 'demo_mem_00001'));
          existing[collection] = [...data[collection], ...oldUnchangedDemo, ...userRecords];
        });
        Object.keys(data).forEach(key => { if (!Array.isArray(data[key])) existing[key] = data[key]; });
        localStorage.setItem(DEMO_DB_KEY, JSON.stringify(existing));
        this._memoryDb = existing;
        window.dispatchEvent(new CustomEvent('gymflow:data-changed', { detail: { seed: 'dashboard-demo-upgrade' } }));
        return true;
      }
      localStorage.setItem(DEMO_DB_KEY, JSON.stringify(data));
      this._memoryDb = data;
    } catch (e) {
      this._memoryDb = data;
    }
    window.dispatchEvent(new CustomEvent('gymflow:data-changed', { detail: { seed: 'dashboard-demo' } }));
    return true;
  }

  hasDemoData() {
    try { return Boolean(localStorage.getItem(DEMO_DB_KEY)); }
    catch (e) { return Boolean(this._memoryDb?._dashboardDemoVersion); }
  }

  // Get entire collection or filter with a predicate/query object
  get(collection, filterFn = null) {
    const db = this._getDb();
    const items = db[collection] || [];
    if (!filterFn) return [...items];

    if (typeof filterFn === 'function') {
      return items.filter(filterFn);
    } else if (typeof filterFn === 'object') {
      return items.filter(item => {
        return Object.keys(filterFn).every(key => item[key] === filterFn[key]);
      });
    }
    return [...items];
  }

  getById(collection, id) {
    const items = this.get(collection);
    return items.find(item => String(item.id) === String(id)) || null;
  }

  findById(collection, id) {
    return this.getById(collection, id);
  }

  insert(collection, item) {
    const db = this._getDb();
    if (!db[collection]) db[collection] = [];

    // Auto-generate ID if absent
    if (!item.id) {
      const prefix = collection.substring(0, 3);
      item.id = `${prefix}_${Date.now()}`;
    }

    db[collection].unshift(item);
    this._saveDb(db);

    // Record demo audit log
    this._logActivity('INSERT', collection, `Added item ${item.name || item.title || item.id}`);
    return item;
  }

  update(collection, id, updates) {
    const db = this._getDb();
    const list = db[collection] || [];
    const index = list.findIndex(item => String(item.id) === String(id));

    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      this._saveDb(db);
      this._logActivity('UPDATE', collection, `Updated ID ${id}`);
      return list[index];
    }
    return null;
  }

  delete(collection, id) {
    const db = this._getDb();
    const list = db[collection] || [];
    const initialLen = list.length;
    db[collection] = list.filter(item => String(item.id) !== String(id));

    if (db[collection].length !== initialLen) {
      this._saveDb(db);
      this._logActivity('DELETE', collection, `Deleted ID ${id}`);
      return true;
    }
    return false;
  }

  _logActivity(action, resource, details) {
    try {
      const db = this._getDb();
      if (!db.auditLogs) db.auditLogs = [];
      const user = JSON.parse(sessionStorage.getItem('gymflow_user') || '{}');
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);

      db.auditLogs.unshift({
        id: `log_${Date.now()}`,
        timestamp: dateStr,
        actor: user.name || 'Demo User',
        role: user.role || 'Guest',
        action: `${action}_${resource.toUpperCase()}`,
        resource: details,
        ip: '127.0.0.1 (Demo)',
        result: 'Success'
      });
      // Keep audit logs trimmed
      if (db.auditLogs.length > 50) db.auditLogs.pop();
      try {
        localStorage.setItem(this._activeKey(), JSON.stringify(db));
      } catch (e) {}
    } catch (e) {}
  }
}

// Global instance
const GymFlowDB = new StorageManager();
window.GymFlowDB = GymFlowDB;
