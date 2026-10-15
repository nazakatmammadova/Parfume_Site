// Site header: logo, navigation (offcanvas on mobile) and cart button.
// Rendered from one place so every page stays identical.

import { $ } from "../core/utils.js";
import { getCartCount, onCartChange } from "../core/cart.js";
import { logoHtml } from "./logo.js";

const NAV_LINKS = [
  { page: "home", href: "index.html", label: "Ana Səhifə" },
  { page: "about", href: "about.html", label: "Haqqımızda" },
  { page: "blog", href: "blog.html", label: "Bloq" },
  { page: "categories", href: "categories.html", label: "Kateqoriyalar" },
  { page: "contact", href: "index.html#contact", label: "Əlaqə" },
];

const navItem = ({ page, href, label }, currentPage) => {
  const isActive = page === currentPage;
  return `
    <li class="nav-item">
      <a class="nav-link${isActive ? " active" : ""}" href="${href}"${isActive ? ' aria-current="page"' : ""}>${label}</a>
    </li>`;
};

const template = (currentPage) => `
  <nav class="navbar navbar-expand-lg" aria-label="Əsas menyu">
    <div class="container">
      <button class="icon-btn d-lg-none" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#siteNav" aria-controls="siteNav" aria-label="Menyunu aç">
        <i class="bi bi-list"></i>
      </button>

      ${logoHtml("navbar-brand")}

      <div class="offcanvas offcanvas-start site-nav" tabindex="-1" id="siteNav" aria-labelledby="siteNavLabel">
        <div class="offcanvas-header">
          <h2 class="offcanvas-title h5" id="siteNavLabel">Menyu</h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Bağla"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav mx-lg-auto">
            ${NAV_LINKS.map((link) => navItem(link, currentPage)).join("")}
          </ul>
        </div>
      </div>

      <button class="icon-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer"
              aria-controls="cartDrawer" aria-label="Səbəti aç">
        <i class="bi bi-bag"></i>
        <span class="cart-badge" data-cart-count>0</span>
      </button>
    </div>
  </nav>`;

export function renderHeader(currentPage) {
  const header = $("#site-header");
  if (!header) return;

  header.classList.add("site-header");
  // A product detail page belongs under "Kateqoriyalar" in the menu.
  header.innerHTML = template(currentPage === "product" ? "categories" : currentPage);

  // Close the mobile menu when an in-page link (e.g. #contact) is clicked.
  header.querySelectorAll(".site-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      window.bootstrap?.Offcanvas.getInstance("#siteNav")?.hide();
    });
  });

  const badge = $("[data-cart-count]", header);
  const updateBadge = () => {
    const count = getCartCount();
    badge.textContent = count;
    badge.classList.toggle("has-items", count > 0);
  };
  updateBadge();
  onCartChange(() => {
    updateBadge();
    badge.classList.remove("bump");
    void badge.offsetWidth; // restart animation
    badge.classList.add("bump");
  });

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
