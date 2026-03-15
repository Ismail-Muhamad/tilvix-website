
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    siteNav?.classList.remove('is-open');
    menuToggle?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-year], #year').forEach(el => el.textContent = new Date().getFullYear());

const contactForm = document.getElementById('contactForm');
const projectType = document.getElementById('projectType');
const platformField = document.getElementById('platformField');
const platformSelect = document.getElementById('platform');
if (projectType && platformField) {
  const syncPlatform = () => {
    const mobile = projectType.value === 'mobile';
    platformField.hidden = !mobile;
    if (!mobile && platformSelect) platformSelect.value = '';
  };
  projectType.addEventListener('change', syncPlatform);
  syncPlatform();
}

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const type = document.getElementById('projectType')?.value;
    const typeText = document.getElementById('projectType')?.selectedOptions?.[0]?.textContent || '';
    const platform = document.getElementById('platform')?.value;
    const platformText = document.getElementById('platform')?.selectedOptions?.[0]?.textContent || '';
    const message = document.getElementById('message')?.value.trim();

    if (!name || !type || !message) {
      alert('اكتب الاسم ونوع المشروع والتفاصيل الأساسية أولًا.');
      return;
    }
    if (type === 'mobile' && !platform) {
      alert('اختر المنصة المستهدفة للموبايل.');
      return;
    }

    const projectLine = type === 'mobile' && platform ? `${typeText} — ${platformText}` : typeText;
    const text = `طلب جديد من موقع Tilvix%0A%0Aالاسم: ${encodeURIComponent(name)}%0Aنوع المشروع: ${encodeURIComponent(projectLine)}%0A%0Aالتفاصيل:%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/201142076661?text=${text}`, '_blank');
  });
}
