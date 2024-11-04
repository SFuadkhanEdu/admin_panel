import * as Interface from "./interface.js";
import { loader } from "./loadingHandler.js";

loader();

const product_name_inp = document.querySelector("#product_name_inp");
const product_price_inp = document.querySelector("#product_price_inp");
const product_description_inp = document.querySelector(
  "#product_description_inp"
);
const product_created_at_inp = document.querySelector(
  "#product_created_at_inp"
);
const submit = document.querySelector("form");
const id = window.location.hash.slice(1);
const product = await Interface.getByID(id);

async function fillForm() {
  console.log(product);
  console.log(product_name_inp);

  product_name_inp.value = product.name;
  product_price_inp.value = product.price;
  product_description_inp.value = product.description;
  product_created_at_inp.value = new Date(product.created_at)
    .toISOString()
    .slice(0, 19)
    .replace("T", "");
}

function submitEvent() {
  submit.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit!");
    const obj = {
      name: product_name_inp.value ?? product.name,
      price: parseFloat(product_price_inp.value) ?? product.price,
      description: product_description_inp.value ?? product.description,
      created_at: product_created_at_inp.value ?? product.created_at,
    };
    await Interface.updateByID(id, obj);
    console.log("Done!");
    // setTimeout(() => {
      window.location.href = "./AdminHomePage.html";
    // }, 1000);
  });
}

fillForm();
submitEvent();
