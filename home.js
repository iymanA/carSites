// home.js (замените полностью)
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  const revealTargets = Array.from(document.querySelectorAll('.faq-item, .faq-contact-box, .faq-title'));
  const ctaBg = document.querySelector('.faq-contact-box');
  const faqLeft = document.querySelector('.faq-list');
  const menuButton = document.querySelector('.menu-button');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;
  const faqButtons = Array.from(document.querySelectorAll('.faq-button'));

  // Инициализация высот для аккордеона
  function setInitialHeights() {
    items.forEach(i => {
      const a = i.querySelector('.faq-answer');
      if (!a) return;
      if (i.classList.contains('active')) {
        a.style.maxHeight = a.scrollHeight + 'px';
        i.querySelector('.faq-item-top')?.setAttribute('aria-expanded', 'true');
      } else {
        a.style.maxHeight = '0px';
        i.querySelector('.faq-item-top')?.setAttribute('aria-expanded', 'false');
      }
    });
  }
  setInitialHeights();

  function closeAll() {
    items.forEach(i => {
      i.classList.remove('active');
      const a = i.querySelector('.faq-answer');
      if (a) a.style.maxHeight = '0px';
      i.querySelector('.faq-item-top')?.setAttribute('aria-expanded', 'false');
    });
  }

  // Аккордеон (по клику на вопрос или кнопку)
  items.forEach(item => {
    const q = item.querySelector('.faq-item-top');
    const a = item.querySelector('.faq-answer');
    if (!q || !a) return;

    const toggleFunc = (e) => {
      if (e) e.preventDefault();
      const isActive = item.classList.contains('active');
      closeAll();
      if (!isActive) {
        item.classList.add('active');
        q.setAttribute('aria-expanded', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
      matchCTA();
    };

    q.addEventListener('click', toggleFunc);
    const btnToggle = item.querySelector('.faq-toggle');
    if (btnToggle) btnToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleFunc(e); });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('revealed');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(t => { if (t) io.observe(t); });
  } else {
    // fallback
    revealTargets.forEach(t => t.classList.add('revealed'));
  }

  // Подогнать высоту right CTA под левую колонку
  function matchCTA() {
    if (!ctaBg || !faqLeft) return;
    const h = Math.max(260, faqLeft.scrollHeight);
    ctaBg.style.minHeight = h + 'px';
  }
  matchCTA();

  // resize debounce
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      setInitialHeights();
      matchCTA();
    }, 120);
  });

  // Sidebar toggle
  if (menuButton && sidebar) {
    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      menuButton.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        menuButton.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    });
  }

  // --- Modal (создаётся динамически, если не существует) ---
  function createModalIfNeeded() {
    if (document.querySelector('.modal-overlay')) return;

    const modalHtml = `
      <div class="modal-overlay" aria-hidden="true">
        <div class="modal" role="dialog" aria-modal="true" aria-label="Задать вопрос">
          <button class="modal-close" aria-label="Закрыть">&times;</button>
          <h2 class="modal-title">ОСТАЛИСЬ <strong>ВОПРОСЫ?</strong></h2>
          <p class="modal-p">Оставьте свои контакты и наш специалист перезвонит вам и ответит на все вопросы</p>
          <form class="modal-form" action="#" novalidate>
            <input name="name" class="modal-input" type="text" placeholder="Ваше имя" required>
            <input name="phone" class="modal-input" type="tel" placeholder="Ваш телефон" required>
            <button class="modal-submit" type="submit">Узнать точную стоимость ➜</button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');

    function closeModal() {
      overlay.classList.remove('visible');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    function openModal() {
      overlay.classList.add('visible');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      // autofocus on name
      const nameInput = overlay.querySelector('.modal-input');
      if (nameInput) nameInput.focus();
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    closeBtn.addEventListener('click', closeModal);

    // Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
    });

    // simple submit handler (пример)
    const form = overlay.querySelector('.modal-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // здесь отправка формы через fetch/ajax или просто закрытие
      // пример: собрать данные
      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim()
      };
      console.log('submit modal form', data);
      // TODO: добавить реальную отправку
      closeModal();
      alert('Спасибо! Ваша заявка принята.');
    });

    // expose open/close to outer scope
    overlay._open = openModal;
    overlay._close = closeModal;
  }

  // Открыть попап при клике на .faq-button
  faqButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      createModalIfNeeded();
      const overlay = document.querySelector('.modal-overlay');
      if (overlay && overlay._open) overlay._open();
    });
  });

});
