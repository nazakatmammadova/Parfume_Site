// Shared setup for every page: header, footer, cart drawer and global effects.

import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderCartDrawer } from "./components/cart-drawer.js";
import { observeReveal } from "./effects/reveal.js";

export function initLayout() {
  document.documentElement.classList.add("has-js");

  const page = document.body.dataset.page;
  renderHeader(page);
  renderFooter();
  renderCartDrawer();
  observeReveal();

  // Header is injected after load, so re-apply a #hash jump (e.g. index.html#contact).
  if (location.hash) {
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }
}
