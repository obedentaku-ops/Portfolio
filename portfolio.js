document.addEventListener('mousemove', function(e) {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

(function initCursor() {
  if (!document.body.classList.contains('catalog-page')) return;

  var cursor = document.getElementById('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);
  }

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var cx = mx, cy = my;
  var paused = false;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
  });

  function loop() {
    if (!paused) {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    }
    requestAnimationFrame(loop);
  }
  loop();

  window._cursorPause  = function() { paused = true;  cursor.style.opacity = '0'; };
  window._cursorResume = function() { paused = false; cursor.style.opacity = '1'; };

  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('a, button, .bubble, .back-btn')) cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('a, button, .bubble, .back-btn')) cursor.classList.remove('hover');
  });
})();

function runPageEnter() {
  var el = document.getElementById('page-enter');
  if (!el) return;
  setTimeout(function() { el.classList.add('done'); }, 60);
}

function spawnStars(container, count, filante) {
  container.innerHTML = '';
  var i, s;
  for (i = 0; i < count; i++) {
    s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    container.appendChild(s);
  }
  if (!filante) return;
  for (i = 0; i < 6; i++) {
    s = document.createElement('div');
    s.className = 'star filante';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(s);
  }
}

function startLoadingSequence(targetPage) {
  var fade    = document.getElementById('screen-fade');
  var loading = document.getElementById('loading-screen');
  var percent = document.getElementById('loadingPercent');
  var bar     = document.getElementById('loadingBar');
  var text    = document.getElementById('loadingText');
  var sf      = document.getElementById('starField');

  percent.textContent = '0%';
  bar.style.width     = '0%';
  percent.style.color = '#fff';
  spawnStars(sf, 70, true);

  if (window._cursorPause) window._cursorPause();
  document.documentElement.style.setProperty('--mx', '-999px');
  document.documentElement.style.setProperty('--my', '-999px');

  fade.classList.add('show');

  setTimeout(function() {
    loading.classList.add('active');

    var steps = [
      { p:  0, t: "Connexion..." },
      { p: 18, t: 'Chargement des données...' },
      { p: 34, t: 'Synchronisation...' },
      { p: 52, t: 'Préparation...' },
      { p: 68, t: 'Presque prêt...' },
      { p: 84, t: 'Finalisation...' },
      { p: 96, t: 'Dernière étape...' },
      { p:100, t: 'TOUT EST PRÊT !' }
    ];

    var idx = 0;

    function nextStep() {
      var s = steps[idx];
      percent.textContent = s.p + '%';
      bar.style.width     = s.p + '%';
      text.textContent    = s.t;

      if (s.p === 100) {
        percent.style.color = '#42ff7b';
        setTimeout(function() {
          fade.classList.add('show');
          setTimeout(function() {
            window.location.href = targetPage;
          }, 900);
        }, 700);
      } else {
        idx++;
        setTimeout(nextStep, 1100 + Math.random() * 900);
      }
    }

    nextStep();
  }, 1600);
}

function initCards() {
  var cardsPanel = document.getElementById('panel-cards');
  if (!cardsPanel) return;

  var slots   = document.querySelectorAll('.card-slot');
  var cards   = document.querySelectorAll('.card');
  var buttons = document.querySelectorAll('.btn-see');

  function checkVisible() {
    var panelTop = cardsPanel.getBoundingClientRect().top;
    var windowH  = window.innerHeight;
    if (panelTop < windowH * 0.85) {
      for (var i = 0; i < slots.length; i++) {
        (function(index) {
          setTimeout(function() {
            slots[index].classList.add('visible');
          }, index * 140);
        })(i);
      }
      document.getElementById('scroller').removeEventListener('scroll', checkVisible);
    }
  }

  var scroller = document.getElementById('scroller');
  if (scroller) scroller.addEventListener('scroll', checkVisible);
  checkVisible(); 

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
      var was = this.classList.contains('flipped');
      for (var j = 0; j < cards.length; j++) {
        cards[j].classList.remove('flipped', 'centered');
      }
      if (!was) this.classList.add('flipped', 'centered');
    });
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener('click', function(e) {
      e.stopPropagation();
      var card   = this.closest('.card');
      var target = card ? card.dataset.target : null;
      if (target) startLoadingSequence(target);
    });
  }
}

function handleReturnScroll() {
  if (!document.getElementById('panel-cards')) return;
  if (window.location.hash === '#cards') {
    setTimeout(function() {
      document.getElementById('panel-cards').scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  runPageEnter();
  initCards();
  handleReturnScroll();
});
