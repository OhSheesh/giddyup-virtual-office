/* Giddyup Gear Virtual HQ · Preview v07 · Approved mobile portrait sync.
   Staging only. Reuses the same embedded approved image shown in each
   lower employee button and matching employee profile. Sunny deliberately
   retains the existing approved shared Operations image. */
(function () {
  'use strict';
  function init() {
    const cards = document.getElementById('mfn-cards');
    if (!cards) return;
    function sync() {
      cards.querySelectorAll('a.mobile-floor-card[href^="#view-"]').forEach(function (card) {
        const href = card.getAttribute('href');
        if (href === '#view-sunny') return;
        const lower = document.querySelector('a.employee-portrait-button[href="' + href + '"] .employee-photo');
        const detail = document.querySelector(href + ' .detail-portrait');
        const portrait = card.querySelector('.mfn-portrait');
        if (!lower || !detail || !portrait) return;
        const approved = getComputedStyle(lower).backgroundImage;
        if (!approved.startsWith('url(') || !approved.includes('data:image/') ||
            approved !== getComputedStyle(detail).backgroundImage) return;
        portrait.style.backgroundImage = approved;
        portrait.style.backgroundPosition = 'center 28%';
        portrait.style.backgroundSize = 'cover';
        portrait.style.backgroundRepeat = 'no-repeat';
        const remote = portrait.querySelector('img');
        const initial = portrait.querySelector('.mfn-initial');
        if (remote) remote.style.display = 'none';
        if (initial) initial.style.display = 'none';
        card.dataset.approvedPortrait = 'matched';
      });
    }
    new MutationObserver(sync).observe(cards, { childList: true });
    sync();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();
