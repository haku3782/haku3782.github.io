(function () {
  var html = document.documentElement;
  var buttons = document.querySelectorAll('.lang button');

  function setLang(lang) {
    html.setAttribute('data-active', lang);
    html.setAttribute('lang', lang);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.set); });
  });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var detected = 'en';
  if (navigator.language) {
    if (navigator.language.startsWith('ja')) detected = 'ja';
    else if (navigator.language.startsWith('ko')) detected = 'ko';
  }
  setLang(saved || detected);
})();
