class ModuleLoader {
  constructor() {
    this.modules = {};
    this.currentLang = localStorage.getItem('nwg-language') || 'en';
  }

  async loadModules() {
    try {
      const response = await fetch('/app/config/modules.json');
      this.modules = await response.json();
      return this.modules;
    } catch (error) {
      console.error('Failed to load modules:', error);
      return null;
    }
  }

  getModule(id) {
    return this.modules.modules?.find(m => m.id === id);
  }

  async loadJSON(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error(`Failed to load ${url}:`, error);
      return null;
    }
  }

  renderNavigation(moduleId, containerId) {
    const nav = document.getElementById(containerId);
    if (!nav || !this.modules.modules) return;

    const items = this.modules.modules.map(m => `
      <a class="nav-item" href="${m.path}">
        <span>${this.currentLang === 'bn' ? m.name_bn : m.name_en}</span>
        <span class="nav-badge">${m.icon}</span>
      </a>
    `).join('');

    nav.innerHTML = `
      <div class="nav-group">
        <div class="nav-group-title">${this.currentLang === 'bn' ? 'সকল মডিউল' : 'All Modules'}</div>
        ${items}
      </div>
    `;
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('nwg-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
  }
}

const moduleLoader = new ModuleLoader();
export default moduleLoader;
