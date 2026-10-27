// =====================================================
// CANTON ROW - PRODUCT DATA + PRODUCT DETAIL LOGIC
// =====================================================


// =====================================================
// DUMMY PRODUCTS
// =====================================================

const products = [

    {
        id: 1,
        name: "Retro Runner",
        brand: "Canton Row",
        category: "Sneakers",
        price: 3499,

        image: "assets/products/retro-runner.jpg",

        description:
            "A clean everyday sneaker designed for comfort, versatility and modern street style.",

        sizes: [6, 7, 8, 9, 10],

        colors: ["Black", "White"]
    },


    {
        id: 2,
        name: "Daily Carry Pack",
        brand: "Urban Edit",
        category: "Bags",
        price: 2199,

        image: "assets/products/daily-carry.jpg",

        description:
            "A minimal everyday carry bag with a clean silhouette and enough space for your daily essentials.",

        colors: ["Black", "Beige"]
    },


    {
        id: 3,
        name: "Matchday Classic",
        brand: "Street Club",
        category: "Jerseys",
        price: 1499,

        image: "assets/products/matchday-classic.jpg",

        description:
            "A classic matchday jersey combining relaxed comfort with a timeless football-inspired look.",

        sizes: ["S", "M", "L", "XL"],

        colors: ["Black", "White"]
    }

];


// =====================================================
// GET ALL PRODUCTS
// =====================================================

function getProducts() {

    return products;

}


// =====================================================
// GET SINGLE PRODUCT BY ID
// =====================================================

function getProductById(id) {

    return products.find(
        product => product.id === Number(id)
    );

}


// =====================================================
// PRODUCT DETAIL PAGE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {


    // -------------------------------------------------
    // Check whether we are on product.html
    // -------------------------------------------------

    const productContainer =
        document.querySelector(".product-container");

    if (!productContainer) {
        return;
    }


    // -------------------------------------------------
    // Get ID from URL
    // Example:
    // product.html?id=1
    // -------------------------------------------------

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        params.get("id");


    // -------------------------------------------------
    // Find Product
    // -------------------------------------------------

    const product =
        getProductById(productId);


    // -------------------------------------------------
    // Product Not Found
    // -------------------------------------------------

    if (!product) {

        productContainer.innerHTML = `

            <div class="product-not-found">

                <h2>Product Not Found</h2>

                <p>
                    Sorry, this product is not available.
                </p>

                <a href="catalog.html">
                    Back to Catalog
                </a>

            </div>

        `;

        return;
    }


    // =================================================
    // DISPLAY PRODUCT INFORMATION
    // =================================================

    const productImage =
        document.querySelector("#productImage");

    const productName =
        document.querySelector("#productName");

    const productBrand =
        document.querySelector("#productBrand");

    const productCategory =
        document.querySelector("#productCategory");

    const productPrice =
        document.querySelector("#productPrice");

    const productDescription =
        document.querySelector("#productDescription");


    // -------------------------------------------------
    // Image
    // -------------------------------------------------

    productImage.src =
        product.image;

    productImage.alt =
        product.name;


    // -------------------------------------------------
    // Name
    // -------------------------------------------------

    productName.textContent =
        product.name;


    // -------------------------------------------------
    // Brand
    // -------------------------------------------------

    productBrand.textContent =
        product.brand;


    // -------------------------------------------------
    // Category
    // -------------------------------------------------

    productCategory.textContent =
        product.category;


    // -------------------------------------------------
    // Price
    // -------------------------------------------------

    productPrice.textContent =
        `₹${product.price.toLocaleString("en-IN")}`;


    // -------------------------------------------------
    // Description
    // -------------------------------------------------

    productDescription.textContent =
        product.description;



    // =================================================
    // SIZE OPTIONS
    // =================================================

    const sizeSection =
        document.querySelector("#sizeSection");

    const sizeOptions =
        document.querySelector("#sizeOptions");


    if (
        product.sizes &&
        product.sizes.length > 0
    ) {

        product.sizes.forEach(size => {

            const button =
                document.createElement("button");

            button.classList.add("variant-btn");

            button.textContent =
                size;


            button.addEventListener("click", () => {

                // Remove selected from all
                document
                    .querySelectorAll(
                        "#sizeOptions .variant-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove("selected");

                    });


                // Select clicked button
                button.classList.add("selected");

            });


            sizeOptions.appendChild(button);

        });

    } else {

        // If product doesn't have sizes
        sizeSection.style.display = "none";

    }



    // =================================================
    // COLOR OPTIONS
    // =================================================

    const colorSection =
        document.querySelector("#colorSection");

    const colorOptions =
        document.querySelector("#colorOptions");


    if (
        product.colors &&
        product.colors.length > 0
    ) {

        product.colors.forEach(color => {

            const button =
                document.createElement("button");

            button.classList.add("variant-btn");

            button.textContent =
                color;


            button.addEventListener("click", () => {

                // Remove selected from all
                document
                    .querySelectorAll(
                        "#colorOptions .variant-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove("selected");

                    });


                // Select clicked color
                button.classList.add("selected");

            });


            colorOptions.appendChild(button);

        });

    } else {

        // If product doesn't have colors
        colorSection.style.display = "none";

    }



    // =================================================
    // QUANTITY
    // =================================================

    let quantity = 1;


    const quantityDisplay =
        document.querySelector("#quantity");


    const minusBtn =
        document.querySelector("#minusBtn");


    const plusBtn =
        document.querySelector("#plusBtn");


    // -------------------------------------------------
    // Plus Button
    // -------------------------------------------------

    plusBtn.addEventListener("click", () => {

        quantity++;

        quantityDisplay.textContent =
            quantity;

    });


    // -------------------------------------------------
    // Minus Button
    // -------------------------------------------------

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

        }

        quantityDisplay.textContent =
            quantity;

    });



    // =================================================
    // ORDER NOW
    // =================================================

    const orderBtn =
        document.querySelector("#orderBtn");


    orderBtn.addEventListener("click", () => {


        // -------------------------------------------------
        // Get Selected Size
        // -------------------------------------------------

        const selectedSize =
            document.querySelector(
                "#sizeOptions .selected"
            );


        // -------------------------------------------------
        // Get Selected Color
        // -------------------------------------------------

        const selectedColor =
            document.querySelector(
                "#colorOptions .selected"
            );


        // -------------------------------------------------
        // Check Size
        // -------------------------------------------------

        if (
            product.sizes &&
            product.sizes.length > 0 &&
            !selectedSize
        ) {

            alert("Please select a size.");

            return;

        }


        // -------------------------------------------------
        // Check Color
        // -------------------------------------------------

        if (
            product.colors &&
            product.colors.length > 0 &&
            !selectedColor
        ) {

            alert("Please select a colour.");

            return;

        }


        // =================================================
        // CREATE ORDER DATA
        // =================================================

        const orderData = {

            productId: product.id,

            productName: product.name,

            brand: product.brand,

            price: product.price,

            size: selectedSize
                ? selectedSize.textContent
                : null,

            color: selectedColor
                ? selectedColor.textContent
                : null,

            quantity: quantity

        };


        // -------------------------------------------------
        // Save Order Temporarily
        // -------------------------------------------------

        localStorage.setItem(
            "currentOrder",
            JSON.stringify(orderData)
        );


        // -------------------------------------------------
        // Go To Orders Page
        // -------------------------------------------------

        window.location.href =
            "orders.html";

    });



    // =================================================
    // BACK TO CATALOG
    // =================================================

    const backBtn =
        document.querySelector("#backBtn");


    backBtn.addEventListener("click", () => {

        window.location.href =
            "catalog.html";

    });

});