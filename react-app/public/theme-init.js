// Early theme application (same behavior as static version)
(function () {
  try {
    var key = 'theme';
    var saved = localStorage.getItem(key);
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {}
})();

