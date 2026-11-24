/* Original vanilla JavaScript: accessible navigation, theme, filters, contact flow. */
(() => {
  'use strict';
  const root = document.documentElement;
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const navToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const backTop = document.querySelector('[data-back-top]');
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Theme preference persists across linked pages; storage failures are harmless.
  let savedTheme;
  try { savedTheme = localStorage.getItem('gcd-theme'); } catch (_) {}
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  const updateThemeLabel = () => {
    if (!themeBtn) return;
    const isDark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    themeBtn.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/></svg>';
  };
  updateThemeLabel();
  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('gcd-theme', root.dataset.theme); } catch (_) {}
    updateThemeLabel();
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false');}
    });
  }

  // Simple scroll reveals; never hides content if IntersectionObserver is absent.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);}
    }), {threshold: .09});
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  const updateScroll = () => backTop?.classList.toggle('visible', scrollY > 550);
  window.addEventListener('scroll', updateScroll, {passive: true}); updateScroll();
  backTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

  // Category filtering on the project page.
  const filters = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  const workCount = document.querySelector('[data-work-count]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const chosen = btn.dataset.filter;
    filters.forEach(other => other.setAttribute('aria-pressed', String(other === btn)));
    let shown = 0;
    projectCards.forEach(card => {
      const match = chosen === 'all' || (card.dataset.category || '').split(' ').includes(chosen);
      card.hidden = !match;
      if (match) shown++;
    });
    if (workCount) workCount.textContent = `${shown} project${shown === 1 ? '' : 's'} shown`;
  }));

  // A static site has no server-side inbox. Submit prepares a real email draft.
  // Users must confirm sending in their own mail application.
  const form = document.querySelector('#contact-form');
  if (form) {
    const altContact = document.querySelector('#contact-alt');
    const syncAlt = () => {
      const selected = form.querySelector('input[name="method"]:checked')?.value || 'Email';
      if (altContact) {
        altContact.required = selected !== 'Email';
        altContact.placeholder = selected === 'WhatsApp' ? 'Your WhatsApp number' : selected === 'LinkedIn' ? 'Your LinkedIn profile URL' : 'Optional alternate contact';
      }
    };
    form.querySelectorAll('input[name="method"]').forEach(input => input.addEventListener('change', syncAlt));
    syncAlt();
    const status = document.querySelector('#form-status');
    const result = document.querySelector('#email-result');
    const openEmail = document.querySelector('#open-email');
    const copyBtn = document.querySelector('#copy-message');
    let message = '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const topic = String(data.get('topic') || 'General inquiry');
      const method = String(data.get('method') || 'Email');
      const alt = String(data.get('alt') || '').trim();
      const details = String(data.get('message') || '').trim();
      message = `Hello Gobinda,\n\n${details}\n\nFrom: ${name}\nEmail: ${email}\nPreferred reply: ${method}\nAlternate contact: ${alt || 'Not provided'}\nInquiry type: ${topic}`;
      const mailto = `mailto:Kdgobinda31@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${topic} — ${name}`)}&body=${encodeURIComponent(message)}`;
      openEmail.href = mailto;
      result.hidden = false;
      status.textContent = 'Your message is ready. Open your email application to review and send it.';
      result.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    });
    copyBtn?.addEventListener('click', async () => {
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(message);
        else {
          const box = document.createElement('textarea');box.value = message;box.style.position='fixed';box.style.opacity='0';
          document.body.appendChild(box);box.select();
          if (!document.execCommand('copy')) throw new Error('Clipboard not available');
          box.remove();
        }
        status.textContent = 'Message copied. Paste it into an email to Kdgobinda31@gmail.com.';
      } catch (_) {status.textContent = 'Copy was blocked by your browser. Please use the email option.';}
    });
  }
})();
