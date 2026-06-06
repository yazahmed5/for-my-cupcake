// ── SCROLL PROGRESS BAR ──────────────────────────────
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

// ── SCROLL REVEAL ────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.quote-block,.timeline-item,.pframe').forEach(el => revealObs.observe(el));

// ── SMOOTH NAV SCROLL ────────────────────────────────
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const navH = document.querySelector('nav').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' });
  });
});

// ── ACTIVE NAV ───────────────────────────────────────
const sections = [
  { id: 'memories', link: document.querySelector('a[href="#memories"]') },
  { id: 'quotes',   link: document.querySelector('a[href="#quotes"]')   },
  { id: 'timeline', link: document.querySelector('a[href="#timeline"]') },
];
const navH = () => document.querySelector('nav').offsetHeight + 20;
function updateActiveNav() {
  let current = null;
  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= navH()) current = id;
  });
  sections.forEach(({ id, link }) => {
    if (link) link.classList.toggle('active', id === current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── FLIP CARD CLICK ──────────────────────────────────
document.querySelectorAll('.flip-wrap').forEach(card => {
  card.addEventListener('click', function(e) {
    const wasFlipped = this.classList.contains('flipped');
    // Close all others first
    document.querySelectorAll('.flip-wrap.flipped').forEach(c => {
      if (c !== this) c.classList.remove('flipped');
    });
    this.classList.toggle('flipped', !wasFlipped);

    // Ripple on front face
    if (!wasFlipped) {
      const front = this.querySelector('.flip-front');
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = front.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
      front.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    }
  });
});

// ── FLOATING PARTICLES ───────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function rand(a, b) { return a + Math.random() * (b - a); }

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x    = rand(0, W);
    this.y    = init ? rand(0, H) : H + 10;
    this.r    = rand(1, 2.5);
    this.vy   = rand(-0.3, -0.8);
    this.vx   = rand(-0.2, 0.2);
    this.life = rand(0.3, 1);
    this.decay= rand(0.0015, 0.003);
    this.hue  = rand(40, 55);
  }
  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},80%,70%,${this.life})`;
    ctx.fill();
  }
}

for (let i = 0; i < 55; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

// ── CURSOR SPARKLE TRAIL ─────────────────────────────
document.addEventListener('mousemove', e => {
  if (Math.random() > 0.35) return; // throttle
  const el = document.createElement('div');
  const size = rand(4, 9);
  el.style.cssText = `
    position:fixed;left:${e.clientX - size/2}px;top:${e.clientY - size/2}px;
    width:${size}px;height:${size}px;border-radius:50%;pointer-events:none;z-index:9998;
    background:radial-gradient(circle,rgba(232,201,109,0.9),rgba(201,137,75,0));
    animation:sparkTrail 0.7s ease forwards;
  `;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
});

const st = document.createElement('style');
st.textContent = `@keyframes sparkTrail{0%{transform:scale(1);opacity:0.9;}100%{transform:scale(0) translateY(-14px);opacity:0;}}`;
document.head.appendChild(st);

// ── SECTION COUNTER (scroll distance glow on headings) ─
const headings = document.querySelectorAll('.section-heading h2');
const headObs  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animation = 'headingPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards';
    }
  });
}, { threshold: 0.5 });

const hStyle = document.createElement('style');
hStyle.textContent = `@keyframes headingPop{0%{letter-spacing:0.05em;opacity:0.5;}100%{letter-spacing:normal;opacity:1;}}`;
document.head.appendChild(hStyle);
headings.forEach(h => headObs.observe(h));

// ── NAV LOGO CLICK SPARK BURST ───────────────────────
document.querySelector('.nav-logo').addEventListener('click', function(e) {
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    const angle = (i / 12) * 360;
    const dist  = rand(30, 70);
    el.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:5px;height:5px;border-radius:50%;pointer-events:none;z-index:9998;
      background:var(--gold);
      animation:burst 0.6s ease-out forwards;
      --dx:${Math.cos(angle * Math.PI/180) * dist}px;
      --dy:${Math.sin(angle * Math.PI/180) * dist}px;
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
});
const bStyle = document.createElement('style');
bStyle.textContent = `@keyframes burst{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0;}}`;
document.head.appendChild(bStyle);

// ── MUSIC PLAYER ────────────────────────────────────
const bgMusic  = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const volSlider= document.getElementById('volSlider');
const volIcon  = document.getElementById('volIcon');
if (bgMusic) {
  bgMusic.volume = 0.4;
  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = '⏸';
    } else {
      bgMusic.pause();
      musicBtn.textContent = '▶';
    }
  }
  function setVol(v) {
    bgMusic.volume = v;
    volIcon.textContent = v == 0 ? '🔇' : v < 0.4 ? '🔉' : '🔊';
  }
  // Try autoplay muted, unmute on first interaction
  bgMusic.muted = true;
  bgMusic.play().then(() => {
    musicBtn.textContent = '⏸';
  }).catch(() => {});

  const unmuteEvents = ['click', 'touchstart', 'pointerdown', 'keydown'];
  const triggerPlay = () => {
    if (bgMusic.muted) {
      bgMusic.muted = false;
      bgMusic.volume = parseFloat(volSlider.value);
    }
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicBtn.textContent = '⏸';
      }).catch(() => {});
    }
    unmuteEvents.forEach(evt => document.removeEventListener(evt, triggerPlay));
  };
  unmuteEvents.forEach(evt => document.addEventListener(evt, triggerPlay, { once: true }));
}