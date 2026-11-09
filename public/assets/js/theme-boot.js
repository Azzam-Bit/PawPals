/* Night Mode: terapkan tema tersimpan SEBELUM render (anti kilat / FOUC) */
(function () {
    try {
        var saved = localStorage.getItem('pawpals-theme');
        var theme = (saved === 'dark' || saved === 'light')
            ? saved
            : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        document.documentElement.style.colorScheme = theme;
    } catch (e) { /* localStorage diblokir -> pakai tema default */ }
})();
