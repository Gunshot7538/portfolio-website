window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
});

// Optimized scroll handling
const progress = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');

let ticking = false;

function updateOnScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (progress && docHeight > 0) {
    progress.style.transform = `scaleX(${scrollTop / docHeight})`;
  }

  if (navbar) {
    navbar.classList.toggle('scrolled', scrollTop > 60);
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}, { passive: true });

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach((el) => revealObs.observe(el));

// Skill bars
const barFills = document.querySelectorAll('.skill-bar-fill');

const barObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const width = parseFloat(entry.target.dataset.w || '1');
      entry.target.style.transform = `scaleX(${width})`;
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach((bar) => barObs.observe(bar));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form
function handleSubmit(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--green)';

  setTimeout(() => {
    btn.innerHTML = 'Send Message <span>→</span>';
    btn.style.background = 'var(--text)';
  }, 3000);
}
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '×' : '☰';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      mobileMenuBtn.textContent = '☰';
    });
  });
}
