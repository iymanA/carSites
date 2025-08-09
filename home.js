document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');

    // Скрываем ответ при инициализации
    answer.style.maxHeight = '0px';
    answer.style.opacity = '0';

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = item.classList.contains('active');

      // Закрываем все
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0px';
        i.querySelector('.faq-answer').style.opacity = '0';
      });

      // Открываем только выбранный
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      }
    });

    // Клик по вопросу тоже открывает
    item.querySelector('span').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.click();
    });
  });

  // Клик вне FAQ закрывает все
  document.addEventListener('click', (e) => {
    faqItems.forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0px';
        item.querySelector('.faq-answer').style.opacity = '0';
      }
    });
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.header-center nav');
    if(navToggle && nav){
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        nav.style.display = nav.classList.contains('open') ? 'block' : '';
      });
    }

    // simple FAQ toggle (поддерживает .faq-item.open)
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', (e) => {
        // если клик в кнопке — ок, иначе тоже работает
        item.classList.toggle('open');
      });
    });
  });
