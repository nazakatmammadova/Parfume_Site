import { initLayout } from "../layout.js";
import { $, escapeHtml, normalize } from "../core/utils.js";
import { products, categories } from "../data/products.js";
import { productCard, bindAddToCart } from "../components/product-card.js";
import { initTypewriter } from "../effects/typewriter.js";
import { observeReveal } from "../effects/reveal.js";

const ALL = "all";

const chips = $("#category-filter");
const grid = $("#product-grid");
const meta = $("#shop-meta");
const searchInput = $("#shop-search");

// State comes from the URL, so links like ?category=women or ?q=dior work.
const params = new URLSearchParams(location.search);
const state = {
  category: categories.some((c) => c.id === params.get("category")) ? params.get("category") : ALL,
  query: params.get("q") ?? "",
};

function syncUrl() {
  const next = new URLSearchParams();
  if (state.category !== ALL) next.set("category", state.category);
  if (state.query) next.set("q", state.query);
  const qs = next.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function renderChips() {
  const options = [{ id: ALL, name: "Hamısı" }, ...categories];
  chips.innerHTML = options
    .map(({ id, name }) => {
      const active = id === state.category;
      return `<li><button type="button" class="filter-chip${active ? " is-active" : ""}"
                data-category="${id}" aria-pressed="${active}">${name}</button></li>`;
    })
    .join("");
}

function renderProducts() {
  const query = normalize(state.query);
  const visible = products.filter(
    (p) =>
      (state.category === ALL || p.category === state.category) &&
      (!query || normalize(p.name).includes(query))
  );

  meta.innerHTML = state.query
    ? `“${escapeHtml(state.query)}” üçün <strong>${visible.length}</strong> nəticə`
    : `<strong>${visible.length}</strong> məhsul`;

  grid.innerHTML = visible.length
    ? visible.map(productCard).join("")
    : `<div class="col-12">
         <div class="empty-state">
           <i class="bi bi-search-heart"></i>
           <h3>Heç nə tapılmadı</h3>
           <p>Başqa açar söz yoxlayın və ya bütün kateqoriyalara baxın.</p>
         </div>
       </div>`;

  observeReveal(grid);
}

chips.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-category]");
  if (!chip) return;
  state.category = chip.dataset.category;
  renderChips();
  renderProducts();
  syncUrl();
});

searchInput.value = state.query;
searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  renderProducts();
  syncUrl();
});
searchInput.form.addEventListener("submit", (e) => e.preventDefault());

bindAddToCart(grid);
renderChips();
renderProducts();

initLayout();
initTypewriter();

