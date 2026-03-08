const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('[data-reveal]');
const year = document.getElementById('year');
const orbs = document.querySelectorAll('.bg-orb');

if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    header.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header?.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  if (!header) return;

  const currentY = window.scrollY;
  header.classList.toggle('scrolled', currentY > 20);
});

window.dispatchEvent(new Event('scroll'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.addEventListener('mousemove', (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const factor = (index + 1) * 9;
    orb.style.transform = `translate(${(x - 0.5) * factor}px, ${(y - 0.5) * factor}px)`;
  });
});
