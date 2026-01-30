const body = document.body;
const filterItems = document.querySelectorAll("#side-bar button");
const gallery = document.getElementById("gallery-view");
/* toggle controller */
const modeSwitch = document.getElementById("mode-switch"); 
const filterToggle = document.querySelector(".filter-toggle");
const sideBar = document.getElementById("side-bar");

filterToggle.addEventListener("click", () => {
  sideBar.classList.toggle("open");

  if (sideBar.classList.contains("open")) {
    filterToggle.textContent = "− Filter";
  } else {
    filterToggle.textContent = "+ Filter";
  }
});


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


let currentFilter = "all";

filterItems.forEach(item => {
    item.addEventListener("click", () => {
        currentFilter = item.dataset.filter;  // save selection
        
        // remove active from all
        filterItems.forEach(btn => btn.classList.remove("active"));

        // add active to clicked
        item.classList.add("active");

        if (currentFilter === "all") {
            renderGallery();  // show everything
        } else {
            renderGallery(currentFilter); // show selected category
        }
    });
});

document.querySelector('[data-filter="all"]').classList.add("active");


// user clicks switch 
// checkbox changes state (checked/unchecked)
modeSwitch.addEventListener("change", () => {  // "change" event fires
    body.classList.toggle("dark-mode"); // if body has dark-mode class, remove. if no dark-mode class, added.

    if (currentFilter === "all") {
        renderGallery();
    } else {
        renderGallery(currentFilter);
    }
});


function renderGallery(filter = null) {
    gallery.innerHTML = ""; //clear previous cards

    productDetail.forEach(product => {
        
        // skip if filter doesn't match
        if (filter && product.category !== filter) return;
        
        // loop through data
        const card = document.createElement('div');  // make an empty box
        card.classList.add('card');  // give it a style name called card

        // decide which image to show based on body class
        /* connects toggle to image 
            does <body> have class "dark-mode" ? */
        const isDark = body.classList.contains("dark-mode"); 

        // shortcut if/else
        const imgSrc = isDark ? product.darkImage : product.lightImage;

        card.innerHTML = `
            <img src="${imgSrc}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
        `;

        // take the finished product card and place it inside the gallery.
        gallery.appendChild(card);
    });
}

// initial render
renderGallery();
