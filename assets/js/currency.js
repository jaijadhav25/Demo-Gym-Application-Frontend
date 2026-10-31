/* Shared GymFlow currency preference, formatter, and cached exchange-rate helper. */
(function () {
  const preferenceKey = 'gymflow_currency_settings';
  const ratesKey = 'gymflow_exchange_rates_INR';
  const currencies = [
    ['INR', 'Indian Rupee', '₹', 'en-IN'], ['USD', 'US Dollar', '$', 'en-US'], ['EUR', 'Euro', '€', 'de-DE'],
    ['GBP', 'British Pound', '£', 'en-GB'], ['AED', 'UAE Dirham', 'د.إ', 'en-AE'], ['CAD', 'Canadian Dollar', 'CA$', 'en-CA'],
    ['AUD', 'Australian Dollar', 'A$', 'en-AU'], ['NZD', 'New Zealand Dollar', 'NZ$', 'en-NZ'], ['SGD', 'Singapore Dollar', 'S$', 'en-SG'],
    ['JPY', 'Japanese Yen', '¥', 'ja-JP'], ['CNY', 'Chinese Yuan', 'CN¥', 'zh-CN'], ['CHF', 'Swiss Franc', 'CHF', 'de-CH'],
    ['SAR', 'Saudi Riyal', 'ر.س', 'en-SA'], ['QAR', 'Qatari Riyal', 'ر.ق', 'en-QA'], ['KWD', 'Kuwaiti Dinar', 'د.ك', 'en-KW'],
    ['BHD', 'Bahraini Dinar', 'د.ب', 'en-BH'], ['OMR', 'Omani Rial', 'ر.ع.', 'en-OM'], ['PKR', 'Pakistani Rupee', '₨', 'en-PK'],
    ['BDT', 'Bangladeshi Taka', '৳', 'en-BD'], ['LKR', 'Sri Lankan Rupee', 'Rs', 'en-LK'], ['NPR', 'Nepalese Rupee', 'रू', 'en-NP'],
    ['ZAR', 'South African Rand', 'R', 'en-ZA'], ['BRL', 'Brazilian Real', 'R$', 'pt-BR'], ['MXN', 'Mexican Peso', 'MX$', 'es-MX'],
    ['SEK', 'Swedish Krona', 'kr', 'sv-SE'], ['NOK', 'Norwegian Krone', 'kr', 'nb-NO'], ['DKK', 'Danish Krone', 'kr', 'da-DK'],
    ['PLN', 'Polish Zloty', 'zł', 'pl-PL'], ['TRY', 'Turkish Lira', '₺', 'tr-TR'], ['THB', 'Thai Baht', '฿', 'th-TH'],
    ['IDR', 'Indonesian Rupiah', 'Rp', 'id-ID'], ['MYR', 'Malaysian Ringgit', 'RM', 'ms-MY'], ['PHP', 'Philippine Peso', '₱', 'en-PH'],
    ['KRW', 'South Korean Won', '₩', 'ko-KR'], ['HKD', 'Hong Kong Dollar', 'HK$', 'en-HK'], ['TWD', 'New Taiwan Dollar', 'NT$', 'zh-TW'],
    ['ILS', 'Israeli New Shekel', '₪', 'en-IL'], ['EGP', 'Egyptian Pound', 'E£', 'en-EG'], ['NGN', 'Nigerian Naira', '₦', 'en-NG']
  ].map(([code, name, symbol, locale]) => ({ code, name, symbol, locale }));
  const currencyByCode = new Map(currencies.map(item => [item.code, item]));
  const renderedAmounts = new Map();
  const originalText = new WeakMap();
  let rates = null;
  let rateTimestamp = 0;
  let observer = null;
  let attributionRequired = false;

  function renderAttribution() {
    if (!attributionRequired || !document.body || document.getElementById('gymflow-fx-attribution')) return;
    const note = document.createElement('div');
    note.id = 'gymflow-fx-attribution';
    note.style.cssText = 'padding:4px 12px;text-align:center;color:#98a2b3;font-size:10px;line-height:1.4';
    note.innerHTML = 'Exchange rates by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline">ExchangeRate-API</a>';
    document.body.appendChild(note);
  }

  function getCurrency() {
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceKey) || '{}');
      return currencyByCode.has(saved.code) ? saved.code : 'INR';
    } catch (_) { return 'INR'; }
  }

  function setCurrency(code) {
    const next = String(code || '').toUpperCase();
    if (!currencyByCode.has(next)) return false;
    try { localStorage.setItem(preferenceKey, JSON.stringify({ code: next, updatedAt: Date.now() })); } catch (_) { /* Storage may be unavailable. */ }
    window.dispatchEvent(new CustomEvent('gymflow:currency-changed', { detail: { code: next } }));
    refresh();
    return true;
  }

  function getCurrencyInfo(code = getCurrency()) { return currencyByCode.get(code) || currencyByCode.get('INR'); }

  function convert(amount, sourceCode = 'INR', targetCode = getCurrency()) {
    const value = Number(amount);
    const source = currencyByCode.has(String(sourceCode).toUpperCase()) ? String(sourceCode).toUpperCase() : 'INR';
    const target = currencyByCode.has(String(targetCode).toUpperCase()) ? String(targetCode).toUpperCase() : getCurrency();
    if (!Number.isFinite(value)) return { amount: 0, converted: false, source, target };
    if (source === target) return { amount: value, converted: false, source, target };
    const sourceRate = rates?.[source], targetRate = rates?.[target];
    if (!Number.isFinite(sourceRate) || !Number.isFinite(targetRate) || sourceRate <= 0 || targetRate <= 0) return { amount: value, converted: false, source, target };
    attributionRequired = true;
    renderAttribution();
    return { amount: value / sourceRate * targetRate, converted: true, source, target };
  }

  function format(amount, sourceCode = 'INR', targetCode = getCurrency()) {
    const result = convert(amount, sourceCode, targetCode);
    const code = result.converted || result.source === result.target ? result.target : result.source;
    const info = getCurrencyInfo(code);
    let display;
    try {
      display = new Intl.NumberFormat(info.locale, { style: 'currency', currency: info.code }).format(result.amount);
    } catch (_) { display = `${info.symbol}${Number(result.amount || 0).toFixed(2)}`; }
    renderedAmounts.set(display, { amount: Number(amount) || 0, source: result.source });
    return display;
  }

  function formatOriginal(amount, sourceCode = 'INR') {
    const source = currencyByCode.has(String(sourceCode).toUpperCase()) ? String(sourceCode).toUpperCase() : 'INR';
    return format(amount, source, source);
  }

  function currencyFromSymbol(symbol) {
    const map = { '₹': 'INR', '$': 'USD', '€': 'EUR', '£': 'GBP', 'د.إ': 'AED', 'CA$': 'CAD', 'C$': 'CAD', 'A$': 'AUD', 'NZ$': 'NZD', 'S$': 'SGD', '¥': 'JPY', 'CN¥': 'CNY', '₨': 'PKR', '৳': 'BDT', 'R': 'ZAR', 'R$': 'BRL', 'MX$': 'MXN', '₺': 'TRY', '฿': 'THB', 'Rp': 'IDR', 'RM': 'MYR', '₱': 'PHP', '₩': 'KRW', 'HK$': 'HKD', 'NT$': 'TWD', '₪': 'ILS', 'E£': 'EGP', '₦': 'NGN' };
    return map[symbol] || null;
  }

  const amountPattern = /(د\.إ|CA\$|C\$|A\$|NZ\$|S\$|CN¥|MX\$|HK\$|NT\$|R\$|E£|₹|\$|€|£|¥|₨|৳|R|₺|฿|Rp|RM|₱|₩|₪|₦)\s*(-?\d[\d,]*(?:\.\d+)?)(?:\s*([LK]))?/g;

  function renderTextNode(node) {
    if (!node?.parentElement || node.parentElement.closest('script,style,textarea,input,[data-currency-ignore]')) return;
    const original = originalText.has(node) ? originalText.get(node) : node.nodeValue;
    if (!original || !/[₹$€£¥₨৳₺฿₱₩₪₦]|د\.إ|CA\$|C\$|A\$|NZ\$|S\$|R\$|Rp|RM|HK\$|NT\$|CN¥|MX\$|E£/.test(original)) return;
    let output = original;
    for (const [rendered, meta] of renderedAmounts) {
      if (output.includes(rendered)) output = output.split(rendered).join(format(meta.amount, meta.source));
    }
    output = output.replace(amountPattern, (match, symbol, numeric, scale) => {
      const source = currencyFromSymbol(symbol);
      if (!source) return match;
      const amount = Number(String(numeric).replace(/,/g, '')) * (scale?.toUpperCase() === 'L' ? 100000 : scale?.toUpperCase() === 'K' ? 1000 : 1);
      if (!Number.isFinite(amount)) return match;
      const converted = convert(amount, source);
      if (!converted.converted && converted.source !== converted.target) return match;
      return format(amount, source);
    });
    if (!originalText.has(node)) originalText.set(node, original);
    if (node.nodeValue !== output) node.nodeValue = output;
  }

  function scan(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) renderTextNode(node);
  }

  function refresh() {
    document.querySelectorAll('[data-current-currency-symbol]').forEach(node => { node.textContent = getCurrencyInfo().symbol; });
    document.querySelectorAll('[data-current-currency-code]').forEach(node => { node.textContent = getCurrency(); });
    scan();
  }

  function loadRates() {
    try {
      const cache = JSON.parse(localStorage.getItem(ratesKey) || 'null');
      if (cache?.rates && cache.base === 'INR') { rates = cache.rates; rateTimestamp = Number(cache.timestamp) || 0; }
    } catch (_) { /* Ignore invalid cache. */ }
    if (!rates) rates = { INR: 1 };
    if (Date.now() - rateTimestamp < 24 * 60 * 60 * 1000) { refresh(); return; }
    fetch('https://open.er-api.com/v6/latest/INR', { cache: 'no-store' })
      .then(response => { if (!response.ok) throw new Error('Exchange rate service unavailable'); return response.json(); })
      .then(data => {
        if (data.result !== 'success' || data.base_code !== 'INR' || !data.rates) throw new Error('Exchange rates unavailable');
        rates = data.rates; rateTimestamp = Date.now();
        try { localStorage.setItem(ratesKey, JSON.stringify({ base: 'INR', timestamp: rateTimestamp, rates })); } catch (_) { /* Keep rates in memory. */ }
        window.dispatchEvent(new CustomEvent('gymflow:exchange-rates-updated'));
        refresh();
      })
      .catch(error => console.warn('Currency conversion unavailable; showing original transaction currency.', error));
  }

  function start() {
    document.querySelectorAll('[data-currency-selector]').forEach(select => {
      select.replaceChildren(...currencies.map(item => {
        const option = document.createElement('option');
        option.value = item.code;
        option.textContent = `${item.code} — ${item.name} (${item.symbol})`;
        return option;
      }));
      select.value = getCurrency();
      if (!select.dataset.currencyBound) {
        select.addEventListener('change', () => setCurrency(select.value));
        select.dataset.currencyBound = 'true';
      }
    });
    refresh();
    if (!observer && document.body) {
      observer = new MutationObserver(records => records.forEach(record => {
        if (record.type === 'characterData') renderTextNode(record.target);
        else record.addedNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) renderTextNode(node); else if (node.nodeType === Node.ELEMENT_NODE) scan(node); });
      }));
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
    loadRates();
  }

  window.Currency = { currencies, getCurrency, getCurrencyInfo, setCurrency, convert, format, formatOriginal, refresh };
  window.addEventListener('storage', event => { if (event.key === preferenceKey) { window.dispatchEvent(new CustomEvent('gymflow:currency-changed', { detail: { code: getCurrency() } })); refresh(); } });
  window.addEventListener('gymflow:currency-changed', refresh);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
