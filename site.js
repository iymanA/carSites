document.addEventListener('DOMContentLoaded', () => {
  // Variant A: Home/Calculator header (simple UL inside .header-center)
  const menuToggle = document.querySelector('.menu-toggle');
  const simpleMenu = document.querySelector('.header-center nav ul');
  if (menuToggle && simpleMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = simpleMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!simpleMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        simpleMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Variant B: About/Contacts/ScemeWork header (has .menu-button and .nav-main or .main-nav)
  const headers = document.querySelectorAll('.header');
  headers.forEach((header) => {
    const btn = header.querySelector('.menu-button');
    const nav = header.querySelector('.nav-main, .main-nav');
    if (btn && nav) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        header.classList.toggle('mobile-open');
      });
      document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) header.classList.remove('mobile-open');
      });
    }
  });
});