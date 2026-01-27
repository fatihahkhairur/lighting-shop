const gallery = document.getElementById("gallery-view");
/* const toggleMode = document.getElementById("toggle"); */
/* const modeBtn = document.getElementById("mode-btn"); */
const modeSwitch = document.getElementById("mode-switch");
const body = document.body;

const productDetail = [
    { lightImage: "images/product1-light.png",
        darkImage: "images/product1-dark.png",
        name: "Product A",
        price: "Starting from RM200"
    },
/*     { image: "images/item2.png",
        name: "Product B",
        price: "Starting from RM200"
    },
    { image: "images/item3.png",
        name: "Product C",
        price: "Starting from RM200"
    },
    { image: "images/item4.png",
        name: "Product D",
        price: "Starting from RM200"
    }, */
    { lightImage: "images/product2-light.png",
        darkImage: "images/product2-dark.png",
        name: "Product E",
        price: "Starting from RM200"
    }
];

// Toggle dark mode when switch changes
modeSwitch.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    renderGallery(); // update product images
});


function renderGallery() {
    gallery.innerHTML = ""; //clear previous cards

    productDetail.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Decide which image to show based on body class
        const isDark = body.classList.contains("dark-mode");
        const imgSrc = isDark ? product.darkImage : product.lightImage;

        card.innerHTML = `
            <img src="${imgSrc}" alt="${product.name}">
            <h1 class="product-name">${product.name}</h1>
            <p>${product.price}</p>
        `;

        gallery.appendChild(card);
    });
}

// Initial render
renderGallery();

/* // Toggle dark mode
modeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");  // add/remove dark mode
    renderGallery(); // re-render gallery images
}); */