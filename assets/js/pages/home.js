import { initLayout } from "../layout.js";
import { $ } from "../core/utils.js";
import { products } from "../data/products.js";
import { productCard, bindAddToCart } from "../components/product-card.js";

const FEATURED_COUNT = 8;

const grid = $("#featured-products");
grid.innerHTML = products.slice(0, FEATURED_COUNT).map(productCard).join("");
bindAddToCart(grid);

initLayout();
