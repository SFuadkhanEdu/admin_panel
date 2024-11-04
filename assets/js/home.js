import * as Interface from "./interface.js";
import { loader } from "./loadingHandler.js";
const tbody = document.querySelector("tbody");

loader();
function declareTbody(element, deleteButton, updateButton) {
  const row = document.createElement("tr");
  const idCell = document.createElement("td");
  const nameCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const descriptionCell = document.createElement("td");
  const createdAtCell = document.createElement("td");
  const modifyCell = document.createElement("td");

  idCell.textContent = element.id;
  nameCell.textContent = element.name;
  nameCell.classList.add("cursor");
  priceCell.textContent = element.price;
  descriptionCell.textContent = element.description;
  createdAtCell.textContent = element.created_at;

  nameCell.addEventListener("click", async () => {
    window.location.href = "./DetailPage.html#" + element.id;
  });

  modifyCell.appendChild(deleteButton);
  modifyCell.appendChild(updateButton);

  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(descriptionCell);
  row.appendChild(createdAtCell);
  row.appendChild(modifyCell);

  tbody.appendChild(row);
}
function declareDeleteBtn() {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.textContent = "X";
  return deleteButton;
}
function declareUpdateBtn() {
  const updateButton = document.createElement("button");
  updateButton.classList.add("btn");
  updateButton.classList.add("btn-primary");
  updateButton.textContent = "U";
  return updateButton;
}

async function eventToDelete(element) {
  const response = await Interface.deleteByID(element.id);
  loader();
  if (response === 200) {
    createTable();
  } else {
    throw new Error("Failed to delete product");
  }
}
function eventHandlerToDelete(deleteButton, element) {
  deleteButton.addEventListener("click", async () => {
    eventToDelete(element);
    deleteButton.removeEventListener("click", eventToDelete);
  });
}
function eventHandlerToUpdate(updateButton, element) {
  updateButton.addEventListener("click", async () => {
    window.location.href = "./AdminUpdatePage.html#" + element.id;
  });
}

async function fetchingAllData() {
  let data = await Interface.getAll();
  data.forEach((element) => {
    const deleteButton = declareDeleteBtn();
    eventHandlerToDelete(deleteButton, element);

    const updateButton = declareUpdateBtn();
    eventHandlerToUpdate(updateButton, element);

    declareTbody(element, deleteButton, updateButton);
  });
}
async function createTable() {
  tbody.innerHTML = "";
  fetchingAllData();
}
createTable();
