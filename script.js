// ============================================
// SHARON & DICKSON — LOVE WEBSITE SCRIPTS
// ============================================

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor-sparkle');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// ===== FLOATING HEARTS =====
const heartsContainer = document.getElementById('hearts-container');
const loveEmojis = ['❤️','💕','💖','💗','💝','🌹','💞','🌸','💓','✨','💌','💑','🌺'];

function createFloatingHeart() {
  const el = document.createElement('div');
  el.classList.add('floating-heart');
  el.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
  const size   = 16 + Math.random() * 28;
  const dur    = 6 + Math.random() * 8;
  const left   = Math.random() * 100;
  el.style.left     = left + '%';
  el.style.fontSize = size + 'px';
  el.style.animationDuration = dur + 's';
  heartsContainer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

// Launch hearts continuously
setInterval(createFloatingHeart, 400);
// Burst on load
for (let i = 0; i < 15; i++) {
  setTimeout(createFloatingHeart, i * 100);
}

// ===== QUOTE TICKER =====
const tickerQuotes = [
  '"You are my today and all of my tomorrows." 💕',
  '"Love is not about how many days, months or years you have been together. It is about how much you love each other every single day." 🌹',
  '"In your smile I see something more beautiful than the stars." ✨',
  '"With you, every day feels like Valentine\'s Day." 💖',
  '"You are the reason I believe in love." 💝',
  '"My heart found its home the day I found you." 🌸',
  '"Forever is not long enough with you." 💞',
];

let tickerIdx = 0;
const tickerEl = document.getElementById('ticker-text');

function cycleTicker() {
  const ticker = document.querySelector('.ticker-content');
  ticker.style.opacity = '0';
  setTimeout(() => {
    tickerIdx = (tickerIdx + 1) % tickerQuotes.length;
    tickerEl.textContent = tickerQuotes[tickerIdx];
    ticker.style.opacity = '1';
  }, 500);
}

setInterval(cycleTicker, 4500);

// ===== QUOTES CAROUSEL =====
const slides = document.querySelectorAll('.quote-slide');
const dots   = document.querySelectorAll('.dot');
let currentSlide = 0;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance carousel
let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    goToSlide(parseInt(dot.dataset.idx));
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });
});

// Swipe support
let touchStartX = 0;
const carousel = document.querySelector('.quotes-carousel');
carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
carousel.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    clearInterval(autoSlide);
    goToSlide(currentSlide + (diff > 0 ? 1 : -1));
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
});

// ===== EMOJI RAIN =====
const emojiRain = document.getElementById('emoji-rain');
const rainEmojis = ['💕','❤️','🌹','💖','✨','🌸','💝','💌','🌺','💞','💗','🎊'];

function createRainEmoji() {
  if (!isInViewport(document.getElementById('emoji-section'))) return;
  const el = document.createElement('div');
  el.classList.add('rain-emoji');
  el.textContent = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
  const size = 18 + Math.random() * 22;
  const dur  = 3 + Math.random() * 4;
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = size + 'px';
  el.style.animationDuration = dur + 's';
  emojiRain.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

setInterval(createRainEmoji, 300);

// ===== SCROLL ANIMATIONS =====
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function onScroll() {
  document.querySelectorAll('.story-card, .gallery-item, .quote-slide.active, .letter-card').forEach(el => {
    if (isInViewport(el)) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Initialize hidden for scroll animation
document.querySelectorAll('.story-card, .gallery-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
});

window.addEventListener('scroll', onScroll);
setTimeout(onScroll, 200);

// ===== CLICK SPARKLE EFFECT =====
document.addEventListener('click', (e) => {
  const sparkles = ['💖','✨','💕','🌹','💝','🌸'];
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    s.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${16 + Math.random() * 16}px;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      animation: sparkleOut 0.8s ease forwards;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
});

// Add sparkle keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkleOut {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(0deg); }
    100% { opacity: 0; transform: translate(calc(-50% + ${Math.random()*60-30}px), calc(-50% - 60px)) scale(0.3) rotate(${Math.random()*360}deg); }
  }
`;
document.head.appendChild(style);

// ===== BIG EMOJI ROW — stagger animation =====
document.querySelectorAll('.big-emoji-row span').forEach((span, i) => {
  span.style.animationDelay = (i * 0.18) + 's';
});

// ===== HERO: emoji row cycling =====
const heroEmojiSets = [
  '💕 🌹 💖 🌸 💑 🌺 💞 ✨ 💝',
  '❤️ 🥰 💌 🌷 💖 ✨ 💍 🌹 💕',
  '🌸 💝 🎊 💋 🌺 💞 ✨ 🌹 💗',
];

let heroEmojiIdx = 0;
const emojiRow = document.getElementById('emoji-row');

setInterval(() => {
  emojiRow.style.opacity = '0';
  emojiRow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    heroEmojiIdx = (heroEmojiIdx + 1) % heroEmojiSets.length;
    emojiRow.textContent = heroEmojiSets[heroEmojiIdx];
    emojiRow.style.transition = 'opacity 0.5s, transform 0.5s';
    emojiRow.style.opacity = '1';
    emojiRow.style.transform = 'scale(1)';
  }, 400);
}, 3000);

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
