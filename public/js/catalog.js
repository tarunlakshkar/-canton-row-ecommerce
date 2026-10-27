
const API_URL = "/api/products";

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".catalog-product-grid");
  const searchInput = document.querySelector("#searchInput");
  const sortFilter = document.querySelector("#sortFilter");
  const clearFilters = document.querySelector("#clearFilters");
  const resultCount = document.querySelector(".catalog-results strong");

  if (!productGrid) return;

  let allProducts = [];

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function renderProducts(products) {
    if (resultCount) {
      resultCount.textContent = products.length;
    }

    if (products.length === 0) {
      productGrid.innerHTML =
        "<p>No products found. Try changing your filters.</p>";
      return;
    }

    productGrid.innerHTML = products.map((product) => {
      const id = encodeURIComponent(product._id);
      const name = escapeHTML(product.name);
      const brand = escapeHTML(product.brand);
      const category = escapeHTML(product.category);
      const image = escapeHTML(product.image);
      const price = Number(product.price).toLocaleString("en-IN");

      const variants = product.sizes?.length
        ? product.sizes
        : product.colors || [];

      const variantLabel = product.sizes?.length ? "Sizes" : "Colours";

      return `
        <article class="catalog-product-card">
          <div class="catalog-product-image">
            <img
              src="${image}"
              alt="${name}"
              loading="lazy"
            >
          </div>

          <div class="catalog-product-info">
            <div class="catalog-product-title">
              <div>
                <h3>${name}</h3>
                <p>${category} · ${brand}</p>
              </div>

              <strong>₹${price}</strong>
            </div>

            <div class="variant-label">${variantLabel}</div>

            <div class="size-list">
              ${variants.map((item) =>
                `<span>${escapeHTML(item)}</span>`
              ).join("")}
            </div>

            <div class="catalog-buttons">
              <a
                href="product.html?id=${id}"
                class="product-details-btn"
              >
                Product Details
              </a>

              <a
                href="product.html?id=${id}"
                class="order-btn"
              >
                Order Now <span>↗</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function applyFilters() {
    const searchText = searchInput?.value.trim().toLowerCase() || "";

    const selectedCategories = [
      ...document.querySelectorAll(
        'input[name="category"]:checked'
      )
    ].map((input) => input.value);

    const selectedBrands = [
      ...document.querySelectorAll(
        'input[name="brand"]:checked'
      )
    ].map((input) => input.value);

    const selectedPrice = document.querySelector(
      'input[name="price"]:checked'
    )?.value || "all";

    let filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const brandKey = {
        "Canton Row": "Canton",
        "Urban Edit": "Urban",
        "Street Club": "Street"
      }[product.brand] || product.brand;

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(brandKey);

      let matchesPrice = true;

      if (selectedPrice === "under2000") {
        matchesPrice = product.price < 2000;
      } else if (selectedPrice === "2000-5000") {
        matchesPrice =
          product.price >= 2000 && product.price <= 5000;
      } else if (selectedPrice === "above5000") {
        matchesPrice = product.price > 5000;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice
      );
    });

    const sortValue = sortFilter?.value;

    if (sortValue === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  }

  async function loadProducts() {
    productGrid.innerHTML = "<p>Loading products...</p>";

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load products");
      }

      const data = await response.json();
      allProducts = data.products || [];

      // URL se category ya brand filter aaya ho toh apply karo.
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      const brandParam = params.get("brand");

      if (categoryParam) {
        document.querySelectorAll('input[name="category"]').forEach(
          (input) => {
            input.checked = input.value === categoryParam;
          }
        );
      }

      if (brandParam) {
        document.querySelectorAll('input[name="brand"]').forEach(
          (input) => {
            input.checked =
              input.value.toLowerCase() === brandParam.toLowerCase();
          }
        );
      }

      applyFilters();
    } catch (error) {
      console.error("Product loading error:", error);

      productGrid.innerHTML =
        "<p>Products could not be loaded. Please try again.</p>";
    }
  }

  searchInput?.addEventListener("input", applyFilters);
  sortFilter?.addEventListener("change", applyFilters);

  document.querySelectorAll(
    'input[name="category"], input[name="brand"], input[name="price"]'
  ).forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

  clearFilters?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";

    document.querySelectorAll(
      'input[name="category"], input[name="brand"], input[name="price"]'
    ).forEach((input) => {
      input.checked = false;
    });

    if (sortFilter) sortFilter.value = "default";

    applyFilters();
  });

  loadProducts();
});
