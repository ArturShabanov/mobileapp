(function () {
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  }
  try { setTheme(localStorage.getItem('mobileapp-theme') === 'dark' ? 'dark' : 'light'); } catch (_) {}
  themeToggle.addEventListener('click', function () {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('mobileapp-theme', theme); } catch (_) {}
  });
  const demo = document.querySelector('.food-demo');
  const demoMenu = document.querySelector('.demo-menu');
  const demoViewport = document.querySelector('.demo-viewport');
  const demoPause = document.getElementById('demo-pause');
  if (demo && demoMenu && demoViewport && demoPause) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = false;
    let visible = false;
    function updateDemo() {
      const staticMode = reduced.matches;
      demoMenu.style.animationPlayState = paused || !visible || staticMode ? 'paused' : 'running';
      demoPause.disabled = staticMode;
      demoPause.textContent = staticMode ? 'Без анимации' : paused ? 'Продолжить' : 'Пауза';
      demoPause.setAttribute('aria-pressed', String(paused));
      demoPause.setAttribute('aria-label', paused ? 'Продолжить прокрутку примера' : 'Приостановить прокрутку примера');
    }
    function measureDemo() {
      const travel = Math.max(0, demoMenu.offsetHeight - demoViewport.clientHeight);
      demo.style.setProperty('--demo-travel', '-' + travel + 'px');
      if (demoMenu.complete && demoMenu.naturalWidth) demo.classList.add('demo-ready');
      updateDemo();
    }
    demoMenu.addEventListener('load', measureDemo);
    new ResizeObserver(measureDemo).observe(demoViewport);
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; updateDemo(); }, { threshold: 0.1 }).observe(demo);
    reduced.addEventListener('change', updateDemo);
    demoPause.addEventListener('click', function () { paused = !paused; updateDemo(); });
    measureDemo();
  }

  function track(event, data) {
    if (typeof window.gtag === 'function') window.gtag('event', event, data || {});
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Открыть меню');
      });
    });
  }

  document.querySelectorAll('[data-whatsapp="direct"]').forEach(function (link) {
    link.addEventListener('click', function () { track('whatsapp_open', { source: 'direct_link' }); });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav && menu) {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Открыть меню');
    }
  });

  const form = document.getElementById('lead-form');
  const followup = document.getElementById('form-followup');
  const confirmSent = document.getElementById('confirm-sent');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const phone = String(data.get('phone') || '').trim();
      const project = String(data.get('project') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!phone || !project) return;
      const text = `Заявка с mobileapp.kz\nПроект: ${project}\nТелефон: ${phone}${message ? '\nЗадача: ' + message : ''}`;
      const url = 'https://wa.me/77004320505?text=' + encodeURIComponent(text);
      track('whatsapp_open', { source: 'contact_form' });
      const opened = window.open('about:blank', '_blank');
      if (opened) {
        opened.opener = null;
        opened.location.href = url;
      }
      if (!opened) {
        status.hidden = false;
        status.textContent = 'Не удалось открыть WhatsApp. Разрешите новые вкладки или нажмите на прямую ссылку рядом с формой.';
      } else {
        status.hidden = true;
        followup.hidden = false;
      }
    });
  }
  if (confirmSent) {
    confirmSent.addEventListener('click', function () {
      track('whatsapp_message_self_reported', { source: 'contact_form' });
      followup.hidden = true;
      status.hidden = false;
      status.textContent = 'Спасибо. Мы ответим вам в WhatsApp.';
    });
  }
})();
