// Slide-in cart panel, available on every page.

import { escapeHtml, formatPrice } from "../core/utils.js";
import {
  getCartItems, getCartCount, getCartTotal,
  setQuantity, removeFromCart, clearCart, onCartChange,
} from "../core/cart.js";
import { productUrl } from "../data/products.js";

const shell = `
  <div class="offcanvas offcanvas-end cart-drawer" tabindex="-1" id="cartDrawer" aria-labelledby="cartDrawerLabel">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title" id="cartDrawerLabel">Səbətim <small data-cart-summary></small></h2>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Bağla"></button>
    </div>
    <div class="offcanvas-body" data-cart-body></div>
    <div class="cart-drawer__footer" data-cart-footer>
      <div class="cart-drawer__total"><span>Cəmi</span><strong data-cart-total></strong></div>
      <button class="btn btn-brand w-100" type="button" data-action="checkout">Sifarişi tamamla</button>
    </div>
  </div>`;

const emptyState = (title, text) => `
  <div class="empty-state">
    <i class="bi bi-bag-heart"></i>
    <h3>${title}</h3>
    <p>${text}</p>
    <a class="btn btn-outline-brand mt-2" href="categories.html">Məhsullara bax</a>
  </div>`;

const itemRow = (item) => `
  <li class="cart-item">
    <img src="${item.image}" alt="" width="72" height="88">
    <div>
      <h3 class="cart-item__name"><a href="${productUrl(item.id)}">${escapeHtml(item.name)}</a></h3>
      <span class="cart-item__unit">${formatPrice(item.price)} / ədəd</span>
      <div class="qty">
        <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Azalt"><i class="bi bi-dash"></i></button>
        <span aria-live="polite">${item.qty}</span>
        <button type="button" data-action="increase" data-id="${item.id}" aria-label="Artır"><i class="bi bi-plus"></i></button>
      </div>
    </div>
    <div class="cart-item__side">
      <span class="cart-item__total">${formatPrice(item.price * item.qty)}</span>
      <button class="cart-item__remove" type="button" data-action="remove" data-id="${item.id}"
              aria-label="${escapeHtml(item.name)} — səbətdən sil">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  </li>`;

export function renderCartDrawer() {
  document.body.insertAdjacentHTML("beforeend", shell);

  const drawer = document.getElementById("cartDrawer");
  const body = drawer.querySelector("[data-cart-body]");
  const footer = drawer.querySelector("[data-cart-footer]");
  const total = drawer.querySelector("[data-cart-total]");
  const summary = drawer.querySelector("[data-cart-summary]");

  const render = () => {
    const items = getCartItems();
    const count = getCartCount();

    summary.textContent = count ? `(${count})` : "";
    footer.hidden = items.length === 0;
    total.textContent = formatPrice(getCartTotal());
    body.innerHTML = items.length
      ? `<ul class="cart-list">${items.map(itemRow).join("")}</ul>`
      : emptyState("Səbətiniz boşdur", "Bəyəndiyiniz ətirləri səbətə əlavə edin.");
  };

  drawer.addEventListener("click", (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const item = getCartItems().find((i) => i.id === id);

    switch (button.dataset.action) {
      case "increase":
        setQuantity(id, item.qty + 1);
        break;
      case "decrease":
        setQuantity(id, item.qty - 1);
        break;
      case "remove":
        removeFromCart(id);
        break;
      case "checkout":
        clearCart();
        body.innerHTML = emptyState("Təşəkkür edirik!", "Sifarişiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.");
        return;
    }
  });

  render();
  onCartChange(render);
}
