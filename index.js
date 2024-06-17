import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunc.js";

let allProducts = null;
let search = "";
let category = "all";

const buttonStatus = document.querySelectorAll("a");
const mainContent = document.getElementById("products");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const listItem = document.querySelectorAll("li");

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((p) => {
    const jsx = `
    <div>
    <img src=${p.image} alt=${p.title} />
    <h4>${shortenText(p.title)}</h4>
    <div id="price">
    <p>${p.price}</p>
    <button>Buy <i class="fa-solid fa-cart-shopping"></i> </button>
    </div>
    <div id="rate">
    <i class="fa-solid fa-star"></i>
    <span>${p.rating.rate}</span>
    </div>
    <div id="count">
    <i class="fa-solid fa-user"></i>
    <span>${p.rating.count}</span>
    </div>
    </div>
    `;
    mainContent.innerHTML += jsx;
  });
};

const handler = async () => {
  if (getCookie()) {
    buttonStatus[0].style.display = "none";
  } else {
    buttonStatus[1].style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);
};

const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });
  showProducts(filteredProducts);
};

const searchHandler = () => {
  search = searchInput.value.toLowerCase().trim();
  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listItem.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });
  filterProducts();
};

document.addEventListener("DOMContentLoaded", handler);
searchButton.addEventListener("click", searchHandler);
listItem.forEach((li) => li.addEventListener("click", filterHandler));
