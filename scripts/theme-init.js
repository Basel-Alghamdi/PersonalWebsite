// Early theme application to prevent flash of incorrect theme
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

