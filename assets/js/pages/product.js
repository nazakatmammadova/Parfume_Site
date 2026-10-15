import { initLayout } from "../layout.js";
import { $, escapeHtml, formatPrice } from "../core/utils.js";
import { products, getProduct, getCategoryName } from "../data/products.js";
import { addToCart } from "../core/cart.js";
import { productCard, bindAddToCart } from "../components/product-card.js";
import { showToast } from "../components/toast.js";

const RELATED_COUNT = 4;
const MAX_QTY = 99;

const NOTE_GROUPS = [
  { key: "top", label: "Yuxarı notlar" },
  { key: "heart", label: "Ürək notları" },
  { key: "base", label: "Baza notları" },
];

const container = $("#product-detail");
const product = getProduct(Number(new URLSearchParams(location.search).get("id")));

const notesHtml = (notes = {}) =>
  NOTE_GROUPS.filter(({ key }) => notes[key]?.length)
    .map(({ key, label }) => `
      <div class="notes__row">
        <dt>${label}</dt>
        <dd>${notes[key].map((n) => `<span class="note-chip">${escapeHtml(n)}</span>`).join("")}</dd>
      </div>`)
    .join("");

const detailTemplate = (p) => {
  const name = escapeHtml(p.name);
  const category = getCategoryName(p.category);
  const categoryUrl = `categories.html?category=${p.category}`;
  return `
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb product-detail__crumbs">
          <li class="breadcrumb-item"><a href="index.html">Ana Səhifə</a></li>
          <li class="breadcrumb-item"><a href="categories.html">Kateqoriyalar</a></li>
          <li class="breadcrumb-item"><a href="${categoryUrl}">${category}</a></li>
          <li class="breadcrumb-item active" aria-current="page">${name}</li>
        </ol>
      </nav>

      <div class="row g-4 g-lg-5">
        <div class="col-lg-6">
          <div class="product-detail__media">
            <img src="${p.image}" alt="${name}" width="800" height="1000">
          </div>
        </div>

        <div class="col-lg-6">
          <div class="product-detail__info">
            <a class="eyebrow" href="${categoryUrl}">${category}</a>
            <h1 class="product-detail__title">${name}</h1>
            <p class="product-detail__price">${formatPrice(p.price)} <span>/ ${p.volume} ml</span></p>
            <p class="product-detail__desc">${escapeHtml(p.description ?? "")}</p>

            <div class="notes">
              <h2 class="notes__title">Ətir notları</h2>
              <dl class="notes__list">${notesHtml(p.notes)}</dl>
            </div>

            <form class="product-detail__buy" data-buy>
              <div class="qty qty--lg">
                <button type="button" data-step="-1" aria-label="Azalt"><i class="bi bi-dash"></i></button>
                <span data-qty aria-live="polite">1</span>
                <button type="button" data-step="1" aria-label="Artır"><i class="bi bi-plus"></i></button>
              </div>
              <button class="btn btn-brand flex-grow-1" type="submit" data-buy-button>
                <i class="bi bi-bag-plus me-2" aria-hidden="true"></i><span>Səbətə at</span>
              </button>
            </form>

            <ul class="product-detail__perks">
              <li><i class="bi bi-patch-check"></i>100% orijinal, sertifikatlı məhsul</li>
              <li><i class="bi bi-truck"></i>Bakı daxili 24 saatda pulsuz çatdırılma</li>
              <li><i class="bi bi-gift"></i>Pulsuz hədiyyə qablaşdırma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
};

const notFoundTemplate = () => `
  <div class="container">
    <div class="empty-state">
      <i class="bi bi-search-heart"></i>
      <h1 class="h3">Məhsul tapılmadı</h1>
      <p>Axtardığınız ətir mövcud deyil və ya silinib.</p>
      <a class="btn btn-outline-brand mt-2" href="categories.html">Bütün məhsullar</a>
    </div>
  </div>`;

function bindBuyForm(p) {
  const form = $("[data-buy]", container);
  const qtyLabel = $("[data-qty]", form);
  const buyLabel = $("[data-buy-button] span", form);
  let qty = 1;
  let resetTimer;

  form.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (!step) return;
    qty = Math.min(MAX_QTY, Math.max(1, qty + Number(step.dataset.step)));
    qtyLabel.textContent = qty;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addToCart(p.id, qty);
    showToast(`<strong>${escapeHtml(p.name)}</strong> (${qty} ədəd) səbətə əlavə edildi`);

    buyLabel.textContent = "Əlavə edildi";
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => (buyLabel.textContent = "Səbətə at"), 1400);
  });
}

// Same category first, then fill up with other products.
function renderRelated(p) {
  const others = products.filter((x) => x.id !== p.id);
  const related = [
    ...others.filter((x) => x.category === p.category),
    ...others.filter((x) => x.category !== p.category),
  ].slice(0, RELATED_COUNT);

  const grid = $("#related-products");
  grid.innerHTML = related.map(productCard).join("");
  bindAddToCart(grid);
  $("#related").hidden = false;
}

if (product) {
  document.title = `${product.name} — Royal Parfume`;
  document.querySelector('meta[name="description"]').content = product.description ?? "";
  container.innerHTML = detailTemplate(product);
  bindBuyForm(product);
  renderRelated(product);
} else {
  document.title = "Məhsul tapılmadı — Royal Parfume";
  container.innerHTML = notFoundTemplate();
}

initLayout();
