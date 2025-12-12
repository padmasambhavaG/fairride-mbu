// Simple Dark/Light theme toggler for FairRide
(function(){
  const LS_KEY = 'theme';
  const ICONS = {
    light: 'assets/theme-logo-light.svg',
    dark: 'assets/theme-logo-dark.svg'
  };

  // Inject light theme overrides
  const css = `
  .theme-light { --bg-color: #f8fafc; --card-bg-color: rgba(255,255,255,0.8); --primary-color: #FBBF24; --primary-color-transparent-1: rgba(251,191,36,0.15); --primary-color-light: #FCD34D; --shadow-color: rgba(17,24,39,0.2); }
  .theme-light body { background-color: var(--bg-color); color: #111827; }
  .theme-light .card, .theme-light .login-card, .theme-light .signup-card, .theme-light .modal-card { background-color: var(--card-bg-color) !important; border-color: rgba(0,0,0,0.06) !important; box-shadow: 0 24px 42px -20px rgba(0,0,0,.25) !important; }
  .theme-light .primary-btn { background-color: #111827 !important; color: #f8fafc !important; box-shadow: 0 10px 18px -8px rgba(17,24,39,.35) !important; }
  .theme-light .primary-btn:hover { box-shadow: 0 14px 22px -10px rgba(17,24,39,.4) !important; }
  .theme-light .bg-gray-800\/50 { background-color: rgba(255,255,255,0.6) !important; }
  .theme-light .bg-gray-900\/50, .theme-light .bg-gray-900\/60, .theme-light .bg-gray-900\/70 { background-color: rgba(255,255,255,0.7) !important; }
  .theme-light .border-gray-700, .theme-light .border-gray-700\/60 { border-color: rgba(0,0,0,0.08) !important; }
  .theme-light .text-slate-50, .theme-light .text-slate-100 { color: #0f172a !important; }
  .theme-light .text-slate-200 { color: #111827 !important; }
  .theme-light .text-slate-300 { color: #1f2937 !important; }
  .theme-light .text-slate-400, .theme-light .text-gray-400 { color: #374151 !important; }
  .theme-light .text-slate-500 { color: #4b5563 !important; }
  .theme-light .bg-gray-700, .theme-light .bg-gray-600 { background-color: #e5e7eb !important; color: #111827 !important; }
  .theme-light .hover\:bg-gray-700\/:hover, .theme-light .hover\:bg-gray-700\/70:hover { background-color: rgba(0,0,0,0.06) !important; }
  .theme-light .bg-gray-700\/50 { background-color: rgba(0,0,0,0.04) !important; }
  .theme-light .bg-gray-700\/60 { background-color: rgba(0,0,0,0.06) !important; }
  .theme-light .bg-gray-700\/70 { background-color: rgba(0,0,0,0.08) !important; }
  /* Inputs */
  .theme-light .input-field { background-color: #ffffff !important; border-color: #e5e7eb !important; color: #111827 !important; }
  .theme-light .input-field::placeholder { color: #9ca3af !important; }
  /* Buttons that use amber still readable on light */
  .theme-light .bg-amber-400 { color: #111827 !important; }
  /* Small toggle fab */
  #theme-toggle-fab { position: fixed; top: 12px; right: 12px; z-index: 200; }
  #theme-toggle-fab button { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.15); }
  #theme-toggle-btn img { width: 24px; height: 24px; transition: transform 0.2s ease; }
  #theme-toggle-btn:active img { transform: scale(0.88); }
  .theme-light #theme-toggle-btn { background-color: rgba(255,255,255,0.72) !important; border-color: rgba(15,23,42,0.16) !important; }
  .theme-light #theme-toggle-btn:hover { background-color: rgba(15,23,42,0.08) !important; }
  .theme-light #theme-toggle-btn img { filter: drop-shadow(0 2px 4px rgba(15,23,42,0.12)); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function applyTheme(t){
    const root = document.documentElement;
    root.classList.toggle('theme-light', t === 'light');
    try { localStorage.setItem(LS_KEY, t); } catch {}
    const btn = document.getElementById('theme-toggle-btn');
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
      icon.src = t === 'light' ? ICONS.light : ICONS.dark;
    }
    if (btn) {
      const label = t === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
      btn.title = label;
      btn.setAttribute('aria-label', label);
    }
  }

  // Insert floating toggle if not present in page
  function ensureFab(){
    if (document.getElementById('theme-toggle-fab')) return;
    const wrap = document.createElement('div');
    wrap.id = 'theme-toggle-fab';
    wrap.innerHTML = '<button id="theme-toggle-btn" type="button" class="bg-gray-800/60 text-slate-200 hover:bg-gray-700/70 rounded-full w-10 h-10 flex items-center justify-center shadow-lg" aria-label="Toggle theme"><img id="theme-toggle-icon" src="" alt="" aria-hidden="true"/></button>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', () => {
      const next = (getTheme() === 'light') ? 'dark' : 'light';
      applyTheme(next);
    });
  }

  function getTheme(){
    try { return localStorage.getItem(LS_KEY) || 'dark'; } catch { return 'dark'; }
  }

  // Init
  ensureFab();
  applyTheme(getTheme());
})();
