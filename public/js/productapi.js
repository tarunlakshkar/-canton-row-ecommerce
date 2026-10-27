
const API_URL = "/api/products";

// HTML ke elements select kar rahe hain
const productImage = document.getElementById("productImage");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productBrand = document.getElementById("productBrand");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const sizeSection = document.getElementById("sizeSection");
const sizeOptions = document.getElementById("sizeOptions");

const colorSection = document.getElementById("colorSection");
const colorOptions = document.getElementById("colorOptions");

const quantityElement = document.getElementById("quantity");
const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const backBtn = document.getElementById("backBtn");
const orderBtn = document.getElementById("orderBtn");

let currentProduct = null;
let quantity = 1;
let selectedSize = "";
let selectedColor = "";

// URL se product ki ID nikalna
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Price ko Indian currency format mein dikhana
function formatPrice(price) {
    return Number(price).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });
}

// Size aur colour ke buttons banana
function renderOptions(container, values, type) {
    container.innerHTML = "";

    values.forEach((value) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = value;
        button.classList.add("variant-option");

        button.addEventListener("click", () => {
            // Pehle sab buttons se selected class hatao
            container.querySelectorAll("button").forEach((btn) => {
                btn.classList.remove("selected");
            });

            // Click kiye button ko selected banao
            button.classList.add("selected");

            if (type === "size") {
                selectedSize = value;
            } else {
                selectedColor = value;
            }
        });

        container.appendChild(button);
    });
}

// MongoDB se product details load karna
async function loadProduct() {
    if (!productId) {
        document.querySelector(".product-container").innerHTML =
            "<p>Product ID missing hai. Please catalog se product select karein.</p>";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`);
        const data = await response.json();

        if (!response.ok || !data.success || !data.product) {
            throw new Error(data.message || "Product nahi mila.");
        }

        currentProduct = data.product;

        // Product ki details HTML mein show karna
        productImage.src = currentProduct.image;
        productImage.alt = currentProduct.name;

        productCategory.textContent = currentProduct.category;
        productName.textContent = currentProduct.name;
        productBrand.textContent = currentProduct.brand;
        productPrice.textContent = formatPrice(currentProduct.price);
        productDescription.textContent =
            currentProduct.description || "No description available.";

        // Sizes show karna
        if (currentProduct.sizes?.length) {
            sizeSection.hidden = false;
            renderOptions(sizeOptions, currentProduct.sizes, "size");
        } else {
            sizeSection.hidden = true;
        }

        // Colours show karna
        if (currentProduct.colors?.length) {
            colorSection.hidden = false;
            renderOptions(colorOptions, currentProduct.colors, "color");
        } else {
            colorSection.hidden = true;
        }

        // Image load na ho toh fallback message
        productImage.onerror = () => {
            productImage.alt = "Product image could not be loaded";
        };

    } catch (error) {
        console.error("Product loading error:", error);
        document.querySelector(".product-container").innerHTML =
            "<p>Product load nahi ho paya. Please catalog se dobara try karein.</p>";
    }
}

// Quantity minus button
minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

// Quantity plus button
plusBtn.addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
});

// Back to Catalog button
backBtn.addEventListener("click", () => {
    window.location.href = "catalog.html";
});

// Order button

 // Order button: save order in MongoDB
orderBtn.addEventListener("click", async () => {
    if (!currentProduct) {
        alert("Product details abhi load nahi hui hain.");
        return;
    }

    // Size validation
    if (currentProduct.sizes?.length && !selectedSize) {
        alert("Please apna size select karein.");
        return;
    }

    // Colour validation
    if (currentProduct.colors?.length && !selectedColor) {
        alert("Please apna colour select karein.");
        return;
    }

    // Customer details read karna
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address) {
        alert("Please name, phone number aur address fill karein.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please valid 10-digit phone number enter karein.");
        return;
    }

    const orderData = {
        productId: currentProduct._id,
        quantity: quantity,
        size: selectedSize || null,
        color: selectedColor || null,
        customer: {
            name: name,
            phone: phone,
            address: address
        }
    };

    try {
        orderBtn.disabled = true;
        orderBtn.textContent = "Placing Order...";

        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Order place nahi hua.");
        }

        alert(
            "Order placed successfully!\n" +
            "Order ID: " + data.order._id +
            "\nTotal: " + formatPrice(data.order.totalAmount)
        );

        console.log("Saved order:", data.order);

    } catch (error) {
        console.error("Order error:", error);
        alert(error.message || "Order place nahi hua. Please try again.");
    } finally {
        orderBtn.disabled = false;
        orderBtn.textContent = "Order Now";
    }
});

// Page load hote hi product fetch karo
loadProduct();
