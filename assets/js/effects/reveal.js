// Fades elements marked with [data-reveal] in as they scroll into view.

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
);

export function observeReveal(root = document) {
  root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
}
