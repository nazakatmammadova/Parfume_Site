export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export const formatPrice = (value) => `$${value.toLocaleString("en-US")}`;

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

// Case- and accent-insensitive comparison, so "sauvage" matches "Sauvage Dior".
export const normalize = (text) =>
  text.toLocaleLowerCase("az").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
