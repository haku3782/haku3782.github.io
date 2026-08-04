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

// Lightbox
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<div class="lightbox-dialog">' +
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<div class="lightbox-stage">' +
        '<button class="lightbox-btn" id="lb-prev" aria-label="Previous">&#8249;</button>' +
        '<img class="lightbox-img" id="lb-img" src="" alt="">' +
        '<button class="lightbox-btn" id="lb-next" aria-label="Next">&#8250;</button>' +
      '</div>' +
      '<div class="lightbox-counter" id="lb-counter"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var img = document.getElementById('lb-img');
  var prev = document.getElementById('lb-prev');
  var next = document.getElementById('lb-next');
  var counter = document.getElementById('lb-counter');
  var images = [];
  var current = 0;

  function show(index) {
    current = index;
    img.src = images[current];
    counter.textContent = (current + 1) + ' / ' + images.length;
    prev.disabled = current === 0;
    next.disabled = current === images.length - 1;
  }

  function open(imgs) {
    images = imgs;
    overlay.classList.add('active');
    show(0);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.querySelectorAll('.lightbox-open').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var imgs = a.dataset.images.split(',').map(function (s) { return s.trim(); });
      open(imgs);
    });
  });

  prev.addEventListener('click', function () { if (current > 0) show(current - 1); });
  next.addEventListener('click', function () { if (current < images.length - 1) show(current + 1); });
  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && current > 0) show(current - 1);
    if (e.key === 'ArrowRight' && current < images.length - 1) show(current + 1);
  });
}());
