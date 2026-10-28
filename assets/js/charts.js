/* ===================================================================
   GymFlow — Chart.js Theme-Aware Wrappers
   Area, Bar, Doughnut, and Line charts customized with GymFlow palettes.
   =================================================================== */

const GymCharts = {
  isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
           document.body.classList.contains('dark-theme');
  },

  getChartColors() {
    const isDark = this.isDarkMode();
    return {
      textColor: isDark ? '#94a3b8' : '#64748b',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)',
      accent: '#10b981',
      accentLight: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)',
      blue: '#2563eb',
      blueLight: isDark ? 'rgba(37, 99, 235, 0.25)' : 'rgba(37, 99, 235, 0.15)',
      purple: '#8b5cf6',
      amber: '#f59e0b',
      rose: '#f43f5e'
    };
  },

  renderRevenueChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const colors = this.getChartColors();
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colors.accentLight);
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels || ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Revenue (₹)',
          data: data || [3200, 3900, 4800, 5200, 6100, 7450],
          borderColor: colors.accent,
          borderWidth: 2.5,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: colors.accent,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` Revenue: ₹${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.textColor, font: { family: "'Plus Jakarta Sans', sans-serif" } }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif" },
              callback: (val) => `₹${val}`
            }
          }
        }
      }
    });
  },

  renderAttendanceChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const colors = this.getChartColors();
    const ctx = canvas.getContext('2d');

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Check-ins',
          data: data || [92, 115, 124, 108, 96, 140, 78],
          backgroundColor: colors.blue,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.textColor }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.textColor, stepSize: 25 }
          }
        }
      }
    });
  },

  renderPlanDistributionChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const colors = this.getChartColors();
    const ctx = canvas.getContext('2d');

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels || ['VIP Annual', 'Quarterly Pass', 'Semi-Annual', 'Monthly', 'PT Elite'],
        datasets: [{
          data: data || [45, 25, 15, 10, 5],
          backgroundColor: [
            colors.accent,
            colors.blue,
            colors.purple,
            colors.amber,
            colors.rose
          ],
          borderWidth: 2,
          borderColor: document.body.classList.contains('dark-theme') ? '#131c31' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.textColor,
              usePointStyle: true,
              padding: 14,
              font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" }
            }
          }
        }
      }
    });
  },

  renderWeightProgressChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const colors = this.getChartColors();
    const ctx = canvas.getContext('2d');

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels || ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Weight (kg)',
          data: data || [84.5, 83.2, 82.0, 81.3],
          borderColor: colors.accent,
          backgroundColor: colors.accentLight,
          borderWidth: 2.5,
          tension: 0.3,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: colors.accent
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: colors.textColor } },
          y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
        }
      }
    });
  }
};

window.GymCharts = GymCharts;
