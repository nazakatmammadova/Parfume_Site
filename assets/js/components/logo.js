// Brand logo: the bottle mark (same artwork as the favicon) + "Royal Parfume" wordmark.
// The wordmark is real text in the site fonts, so it stays sharp at any size.

export const logoHtml = (className = "") => `
  <a class="logo ${className}" href="index.html" aria-label="Royal Parfume — Ana səhifə">
    <img class="logo__mark" src="assets/img/brand/favicon.svg" alt="" width="64" height="64">
    <span class="logo__text" aria-hidden="true">
      <span class="logo__name">Royal</span>
      <span class="logo__tag">Parfume</span>
    </span>
  </a>`;
