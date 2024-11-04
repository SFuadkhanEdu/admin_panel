import * as Interface from "./interface.js";
function open_shop_menu() {
  const element = document.getElementById("dropdown_menu");
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function open_ul_items_and_cart_button() {
  const ul = document.getElementById("navbar_ul");
  const cart = document.getElementById("cart_button");
  if (ul.style.display === "none" || ul.style.display === "") {
    ul.style.display = "block";
    cart.style.display = "block";
  } else {
    ul.style.display = "none";
    cart.style.display = "none";
  }
}

function add_cart() {
  const cart_items = document.getElementById("number");
  const currentCount = parseInt(cart_items.innerText, 10) || 0;
  cart_items.innerText = currentCount + 1;
  console.log("number added");
}

const cards_container = document.querySelector("#cards_container");
const products = await Interface.getAll();
const right = document.querySelector("#right");
const left = document.querySelector("#left");
let page = 0;
right.addEventListener("click", () => {
  page++;
  console.log(page);
  
  if (page > Math.floor(products.length / 8) - 1) page = 0;
  pagingProducts();
});
left.addEventListener("click", () => {
  page--;
  console.log(page);
  
  if (page < 0) page = Math.floor(products.length / 8) - 1;
  pagingProducts();
});
function addCards(product) {
  console.log(product);

  const card_item = document.createElement("div");
  card_item.classList.add("card_item");

  const card_picture_div = document.createElement("div");
  card_picture_div.classList.add("card_picture");
  const card_img = document.createElement("img");
  card_img.src = product.image;
  card_picture_div.appendChild(card_img);

  const card_name = document.createElement("h2");
  card_name.classList.add("card_name");
  card_name.textContent = product.name;

  const card_price = document.createElement("p");
  card_price.textContent = product.price;
  const card_desc = document.createElement("p");
  card_desc.textContent = product.description;

  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.onclick = "add_cart()";

  card_item.appendChild(card_picture_div);
  card_item.appendChild(card_name);
  card_item.appendChild(card_price);
  card_item.appendChild(card_desc);
  card_item.appendChild(button);
  cards_container.appendChild(card_item);
}
function pagingProducts() {
  if (page * 8 > products.length) {
    cards_container.innerHTML = "";
    products.slice(page * 8).forEach((element) => addCards(element));
  } else {
    cards_container.innerHTML = "";

    products
      .slice(page * 8, (page + 1) * 8)
      .forEach((element) => addCards(element));
  }
}
pagingProducts();
