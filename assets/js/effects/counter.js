// Counts [data-count-to] numbers up from 0 the first time they become visible.

import { prefersReducedMotion } from "../core/utils.js";

const DURATION = 2000;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function animate(el) {
  const target = Number(el.dataset.countTo);
  if (prefersReducedMotion()) {
    el.textContent = target;
    return;
  }

  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / DURATION, 1);
    el.textContent = Math.round(easeOut(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll("[data-count-to]").forEach((el) => observer.observe(el));
}
