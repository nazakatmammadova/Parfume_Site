// Cart state, persisted in localStorage so it survives page changes.
// Other modules subscribe with onCartChange() instead of touching the DOM here.

import { getProduct } from "../data/products.js";

const STORAGE_KEY = "royal-parfume:cart";
const events = new EventTarget();

let items = load(); // [{ id, qty }]

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return saved.filter((item) => getProduct(item.id) && item.qty > 0);
  } catch {
    return [];
  }
}

function commit() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private mode) — the cart still works for this page.
  }
  events.dispatchEvent(new Event("change"));
}

export function addToCart(id, qty = 1) {
  const item = items.find((i) => i.id === id);
  if (item) item.qty += qty;
  else items.push({ id, qty });
  commit();
}

export function setQuantity(id, qty) {
  items = qty > 0
    ? items.map((i) => (i.id === id ? { ...i, qty } : i))
    : items.filter((i) => i.id !== id);
  commit();
}

export const removeFromCart = (id) => setQuantity(id, 0);

export function clearCart() {
  items = [];
  commit();
}

export const getCartItems = () =>
  items.map(({ id, qty }) => ({ ...getProduct(id), qty }));

export const getCartCount = () => items.reduce((sum, i) => sum + i.qty, 0);

export const getCartTotal = () =>
  getCartItems().reduce((sum, i) => sum + i.price * i.qty, 0);

export function onCartChange(callback) {
  events.addEventListener("change", callback);
}

// Keep several open tabs in sync.
window.addEventListener("storage", (e) => {
  if (e.key !== STORAGE_KEY) return;
  items = load();
  events.dispatchEvent(new Event("change"));
});
