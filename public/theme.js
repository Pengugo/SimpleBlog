(() => {
  const root = document.documentElement;
  const storageKey = 'pengugo-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const readSavedTheme = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  };

  const render = (theme) => {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.textContent = theme === 'dark' ? '☀' : '☾';
      button.setAttribute('aria-label', theme === 'dark' ? '切换日间模式' : '切换暗色模式');
      button.setAttribute('title', theme === 'dark' ? '切换到日间模式' : '切换到暗色模式');
    });
  };

  render(readSavedTheme() || (media.matches ? 'dark' : 'light'));

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Keep the chosen theme for the current page even if storage is unavailable.
      }
      render(nextTheme);
    });
  });

  media.addEventListener('change', (event) => {
    if (!readSavedTheme()) render(event.matches ? 'dark' : 'light');
  });
})();
