const body = document.body;
const modeSwitch = document.getElementById("mode-switch"); 
const sideBar = document.getElementById("side-bar");
const filterItems = document.querySelectorAll("#side-bar button");  // [All products btn, Wall lamps btn, Table lamps btn, Ceiling lights btn]
const filterToggle = document.querySelector(".filter-toggle");
const gallery = document.getElementById("gallery-view");


const productDetail = [
    { lightImage: "images/product1-light.png",
        darkImage: "images/product1-dark.png",
        name: "Addizern Ceramic Mount Lamp",
        price: "From RM800.00",
        category: "ceiling"
    },
    { lightImage: "images/product2-light.png",
        darkImage: "images/product2-dark.png",
        name: "Kwazoin Lamp",
        price: "From RM500.00",
        category: "wall"
        
    },
    { lightImage: "images/product3-light.png",
        darkImage: "images/product3-dark.png",
        name: "Alimeiron Lamp",
        price: "From RM1,200.00",
        category: "table"
    },
    { lightImage: "images/product4-light.png",
        darkImage: "images/product4-dark.png",
        name: "Berillain Lamp",
        price: "From RM200.00",
        category: "ceiling"
    }
];


/* Clickable +Filter button for mobile size interface */
filterToggle.addEventListener("click", () => {
  sideBar.classList.toggle("open");

  if (sideBar.classList.contains("open")) {
    filterToggle.textContent = "− Filter";
  } else {
    filterToggle.textContent = "+ Filter";
  }
});


// Default state
let currentFilter = "all";

// Add click behavior to EVERY filter button
filterItems.forEach(item => {
    // Event
    item.addEventListener("click", () => {
        // currentFilter can be: "all", "wall", "table", "ceiling"
        // Go to this button → read its custom data → get the value stored in data-filter
        currentFilter = item.dataset.filter;  // Save which filter was chosen. E.g., item.dataset.filter → "wall"
        
        // Remove active style from all buttons. Reset
        filterItems.forEach(btn => btn.classList.remove("active"));

        // Highlight the clicked button. Apply style
        item.classList.add("active");

        if (currentFilter === "all") {
            renderGallery();  // Render the gallery without filtering
        } else {
            renderGallery(currentFilter); // show selected category
        }
    });
});

// Set default active button for All products btn on page load
document.querySelector('[data-filter="all"]').classList.add("active");


// When the switch is toggled (checkbox changes state)
modeSwitch.addEventListener("change", () => {  
    // State flip
    // If body HAS class dark-mode, remove it
    // If body DOESN'T HAS class dark-mode, add it
    body.classList.toggle("dark-mode"); 

    // Re-render
    /* Because product images change in dark mode.
    We need to rebuild the gallery with the correct images. */
    if (currentFilter === "all") {
        renderGallery();
    } else {
        renderGallery(currentFilter);
    }
});


// This function can receive a filter. If nothing is given → filter becomes null
function renderGallery(filter = null) {
    // Clear old content before adding new
    gallery.innerHTML = ""; 

    // Loop through your data list
    productDetail.forEach(product => {        
        // Skip if filter doesn't match
        // filter = "wall" && category of product in productDetail = "wall"
        if (filter && product.category !== filter) return;
        
        // Building HTML to make an empty box
        const card = document.createElement('div');
        card.classList.add('card');  // Give it a class name = card for styling

        // Check if dark mode is on 
        /* Connects toggle to image.
            Does <body> have class "dark-mode" ? */
        const isDark = body.classList.contains("dark-mode"); 

        // Shortcut if/else to pick the correct image
        const imgSrc = isDark ? product.darkImage : product.lightImage;

        // Fill the card with content
        card.innerHTML = `
            <img src="${imgSrc}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
        `;

        // Add card to the page
        gallery.appendChild(card);
    });
}

// Initial render when the page load
renderGallery();
