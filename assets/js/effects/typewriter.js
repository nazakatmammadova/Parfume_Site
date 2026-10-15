// Types out the text of [data-typewriter] elements letter by letter.
// The full text stays in the HTML, so screen readers and search engines see it.

import { prefersReducedMotion } from "../core/utils.js";

export function initTypewriter(speed = 90) {
  document.querySelectorAll("[data-typewriter]").forEach((el) => {
    if (prefersReducedMotion()) return;

    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    el.classList.add("typewriter");

    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
      else setTimeout(() => el.classList.add("is-done"), 1200);
    };
    setTimeout(tick, 300);
  });
}
