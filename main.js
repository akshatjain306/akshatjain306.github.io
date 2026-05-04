import './style.css';

// ============ BOOT SEQUENCE ============
function initBoot() {
  const bootScreen = document.getElementById('bootScreen');
  const lines = document.querySelectorAll('.boot-line');
  lines.forEach((line, i) => {
    const delay = parseInt(line.dataset.delay) || i * 300;
    setTimeout(() => line.classList.add('visible'), delay);
  });
  setTimeout(() => {
    bootScreen.classList.add('hidden');
    document.body.style.overflow = 'auto';
    initTyping();
  }, 2800);
}

// ============ TYPING EFFECT ============
function initTyping() {
  const el = document.getElementById('heroGreeting');
  const text = 'echo "Hello, World. I build things."';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40 + Math.random() * 30);
    }
  }
  type();
}

// ============ CUSTOM CURSOR ============
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    trail.style.transform = `translate(${mx - 15}px, ${my - 15}px)`;
  });
  document.querySelectorAll('a, button, .btn, .project-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      cursor.style.borderColor = '#FF79C6';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.borderColor = '#00E5FF';
    });
  });
}

// ============ PARTICLE BACKGROUND ============
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.3 + 0.05;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ============ SCROLL ANIMATIONS ============
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  sections.forEach(s => observer.observe(s));
  timelineItems.forEach(t => observer.observe(t));
}

// ============ NAV SCROLL EFFECT ============
function initNav() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    // Active section highlight
    const sections = document.querySelectorAll('.section, .hero');
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 200;
      if (window.scrollY >= top) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        document.querySelector('.nav-links')?.classList.remove('open');
        document.getElementById('navHamburger')?.classList.remove('active');
      }
    });
  });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  initBoot();
  initCursor();
  initParticles();
  initScrollReveal();
  initNav();
  initSmoothScroll();
  initMobileMenu();
});

