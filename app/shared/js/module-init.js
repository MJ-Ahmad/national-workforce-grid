import moduleLoader from './module-loader.js';

async function initModule(moduleId) {
  // Load modules config
  await moduleLoader.loadModules();

  // Set initial language
  const lang = localStorage.getItem('nwg-language') || 'en';
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  // Setup language toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = document.documentElement.lang === 'bn' ? 'en' : 'bn';
      moduleLoader.setLanguage(newLang);
      location.reload();
    });
  }

  // Render navigation
  moduleLoader.renderNavigation(moduleId, 'nav-tree');

  // Update footer timestamp
  const footer = document.querySelector('.site-footer');
  if (footer) {
    const now = new Date();
    footer.innerHTML = `<div>Last updated: ${now.toLocaleString()} | Module: ${moduleId}</div>`;
  }
}

export { initModule, moduleLoader };
