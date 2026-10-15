import { $ } from "../core/utils.js";
import { categories, brands } from "../data/products.js";
import { logoHtml } from "./logo.js";

const SOCIAL_LINKS = [
  { icon: "instagram", label: "Instagram", href: "https://instagram.com/" },
  { icon: "facebook", label: "Facebook", href: "https://facebook.com/" },
  { icon: "twitter-x", label: "X", href: "https://x.com/" },
  { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
];

const socialLinksHtml = () => `
  <div class="social-links">
    ${SOCIAL_LINKS.map(({ icon, label, href }) => `
      <a href="${href}" target="_blank" rel="noopener" aria-label="${label}">
        <i class="bi bi-${icon}"></i>
      </a>`).join("")}
  </div>`;

const template = () => `
  <div class="container">
    <div class="row g-4 g-lg-5">
      <div class="col-lg-4 col-md-6">
        ${logoHtml("logo--light mb-4")}
        <p>20 illik təcrübə ilə xidmətinizdə olmaqdan qürur duyuruq. Həyatınızın ən ətirli səhifəsi buradan başlayır.</p>
        ${socialLinksHtml()}
      </div>
      <div class="col-lg-3 col-md-6 col-6">
        <h3>Kateqoriyalar</h3>
        <ul>
          ${categories.map((c) => `<li><a href="categories.html?category=${c.id}">${c.name}</a></li>`).join("")}
        </ul>
      </div>
      <div class="col-lg-2 col-md-6 col-6">
        <h3>Brendlər</h3>
        <ul>
          ${brands.map((b) => `<li><a href="categories.html?q=${encodeURIComponent(b)}">${b}</a></li>`).join("")}
        </ul>
      </div>
      <div class="col-lg-3 col-md-6">
        <h3>İş saatları</h3>
        <p class="mb-1">Bazar ertəsi – Şənbə</p>
        <p class="mb-3">09:00 – 19:00</p>
        <p class="mb-0">Bazar günü – istirahət</p>
      </div>
    </div>
    <div class="footer-bottom text-center">
      © ${new Date().getFullYear()} <strong>Royal Parfume</strong>. Bütün hüquqlar qorunur.
    </div>
  </div>`;

export function renderFooter() {
  const footer = $("#site-footer");
  if (!footer) return;
  footer.classList.add("site-footer");
  footer.innerHTML = template();

  // Any other page section can ask for the same icons with <div data-social-links></div>.
  document.querySelectorAll("[data-social-links]").forEach((el) => {
    el.outerHTML = socialLinksHtml();
  });
}
