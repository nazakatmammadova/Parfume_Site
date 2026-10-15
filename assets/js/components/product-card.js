import { escapeHtml, formatPrice } from "../core/utils.js";
import { getCategoryName, productUrl } from "../data/products.js";
import { addToCart } from "../core/cart.js";
import { showToast } from "./toast.js";

const ADDED_STATE_MS = 1400;

export const productCard = (product) => {
  const name = escapeHtml(product.name);
  return `
    <div class="col-6 col-md-4 col-lg-3" data-reveal>
      <article class="product-card">
        <div class="product-card__media">
          <img src="${product.image}" alt="${name}" loading="lazy" width="400" height="500">
          <button class="product-card__add" type="button" data-add-to-cart="${product.id}"
                  aria-label="${name} — səbətə əlavə et">
            <i class="bi bi-bag-plus" aria-hidden="true"></i>
            <span class="product-card__add-label">Səbətə at</span>
          </button>
        </div>
        <div class="product-card__body">
          <div class="product-card__info">
            <h3 class="product-card__title">
              <a class="product-card__link" href="${productUrl(product.id)}">${name}</a>
            </h3>
            <span class="product-card__category">${getCategoryName(product.category)}</span>
          </div>
          <span class="product-card__price">${formatPrice(product.price)}</span>
        </div>
      </article>
    </div>`;
};

// Briefly turns the button into a "added" check mark.
function flashAdded(button) {
  const icon = button.querySelector("i");
  const label = button.querySelector(".product-card__add-label");
  clearTimeout(button._resetTimer);
  button.classList.add("is-added");
  icon.className = "bi bi-check-lg";
  label.textContent = "Əlavə edildi";
  button._resetTimer = setTimeout(() => {
    button.classList.remove("is-added");
    icon.className = "bi bi-bag-plus";
    label.textContent = "Səbətə at";
  }, ADDED_STATE_MS);
}

// One delegated listener per grid, so re-rendering the grid needs no re-binding.
export function bindAddToCart(container) {
  container.addEventListener("click", (e) => {
    const button = e.target.closest("[data-add-to-cart]");
    if (!button) return;
    addToCart(Number(button.dataset.addToCart));
    flashAdded(button);
    const name = button.closest(".product-card").querySelector(".product-card__title").textContent;
    showToast(`<strong>${escapeHtml(name)}</strong> səbətə əlavə edildi`);
  });
}
