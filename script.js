// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===================== MOBILE MENU =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===================== ACTIVE NAV LINK =====================
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===================== FADE-IN ON SCROLL =====================
const fadeEls = document.querySelectorAll(
  '.project-card, .exp-item, .tool-card, .blog-card, .stat, .hero-badge, .hero-actions, .hero-stats, .section-header'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===================== STAGGER CHILDREN =====================
document.querySelectorAll('.projects-grid, .tools-grid, .blog-grid').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// ===================== CONTACT FORM =====================
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ تم إرسال رسالتك!';
    btn.style.background = '#4ade80';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.textContent = 'إرسال الرسالة ←';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      this.reset();
    }, 2500);
  }, 1200);
});

// ===================== CURSOR GLOW =====================
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed; pointer-events:none; z-index:9999;
  width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%);
  transform:translate(-50%,-50%); transition:left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glow);
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===================== SMOOTH ANCHOR SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
