// Loads the catalogue from assets/data/products.json once and shares it with every module.
// Top-level await: modules that import this wait until the data is ready.

const DATA_URL = new URL("../../data/products.json", import.meta.url);

async function loadCatalogue() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Məhsullar yüklənmədi:", error);
    return { categories: [], brands: [], products: [] };
  }
}

export const { categories, brands, products } = await loadCatalogue();

export const getProduct = (id) => products.find((p) => p.id === id);

export const getCategoryName = (id) => categories.find((c) => c.id === id)?.name ?? "";

export const productUrl = (id) => `product.html?id=${id}`;
