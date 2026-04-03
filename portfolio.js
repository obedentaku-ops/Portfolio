
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
}, { passive: true });


(function initCursor() {

  if (!document.body.classList.contains('catalog-page')) return;


  let cursor = document.getElementById('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);
  }

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let paused = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  (function loop() {
    if (!paused) {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    }
    requestAnimationFrame(loop);
  })();


  window._cursorPause  = () => { paused = true;  cursor.style.opacity = '0'; };
  window._cursorResume = () => { paused = false; cursor.style.opacity = '1'; };

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .bubble, .back-btn')) cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .bubble, .back-btn')) cursor.classList.remove('hover');
  });
})();


function runPageEnter() {
  const el = document.getElementById('page-enter');
  if (!el) return;
  requestAnimationFrame(() => setTimeout(() => el.classList.add('done'), 60));
}


function spawnStars(container, count, filante) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    container.appendChild(s);
  }
  if (!filante) return;
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('div');
    s.className = 'star filante';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(s);
  }
}

function startLoadingSequence(targetPage) {
  const fade    = document.getElementById('screen-fade');
  const loading = document.getElementById('loading-screen');
  const percent = document.getElementById('loadingPercent');
  const bar     = document.getElementById('loadingBar');
  const text    = document.getElementById('loadingText');
  const sf      = document.getElementById('starField');

  percent.textContent = '0%';
  bar.style.width     = '0%';
  percent.style.color = '#fff';
  spawnStars(sf, 70, true);


  if (window._cursorPause) window._cursorPause();
  document.documentElement.style.setProperty('--mx', '-999px');
  document.documentElement.style.setProperty('--my', '-999px');

  fade.classList.add('show');

  setTimeout(() => {
    loading.classList.add('active');
    const steps = [
      { p:  0, t: "Connexion à l'univers..." },
      { p: 18, t: 'Stabilisation orbitale...' },
      { p: 34, t: 'Synchronisation des données...' },
      { p: 52, t: 'Alignement stellaire...' },
      { p: 68, t: 'Calcul des trajectoires...' },
      { p: 84, t: 'Ouverture du portail...' },
      { p: 96, t: 'Finalisation...' },
      { p:100, t: 'TOUT EST PRÊT !' }
    ];
    let idx = 0;
    function nextStep() {
      const s = steps[idx];
      percent.textContent = s.p + '%';
      bar.style.width     = s.p + '%';
      text.textContent    = s.t;
      if (s.p === 100) {
        percent.style.color = '#42ff7b';
        setTimeout(() => {
          fade.classList.add('show');
          setTimeout(() => { window.location.href = targetPage; }, 900);
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
  const cardsPanel = document.getElementById('panel-cards');
  if (!cardsPanel) return;

  const slots   = document.querySelectorAll('.card-slot');
  const cards   = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.btn-see');


  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    slots.forEach((s, i) => setTimeout(() => s.classList.add('visible'), i * 140));
    obs.disconnect();
  }, { threshold: 0.25 });
  obs.observe(cardsPanel);


  cards.forEach(card => {
    card.addEventListener('click', () => {
      const was = card.classList.contains('flipped');
      cards.forEach(c => c.classList.remove('flipped', 'centered'));
      if (!was) card.classList.add('flipped', 'centered');
    });
  });


  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const target = btn.closest('.card')?.dataset.target;
      if (target) startLoadingSequence(target);
    });
  });
}


function handleReturnScroll() {
  if (!document.getElementById('panel-cards')) return;
  if (window.location.hash === '#cards') {
    setTimeout(() => {
      document.getElementById('panel-cards')
        .scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
}


window.addEventListener('DOMContentLoaded', () => {
  runPageEnter();
  initCards();
  handleReturnScroll();
});
