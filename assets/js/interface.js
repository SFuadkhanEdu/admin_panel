const URL = "https://6724ae4cc39fedae05b2552b.mockapi.io/products/products"
async function getAll() {
  const response = await fetch(
    URL
  );
  const products = await response.json();
  return products;
}
async function getByID(id) {
  const response = await fetch(
    URL
  );
  const products = await response.json();
  const product = products.find((product) => product.id === id);
  return product;
}
async function deleteByID(id) {
  const response = await fetch(
    URL + `/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .catch((error) => {
    console.log("123");
  });
  return response.status;
}
async function updateByID(id, obj) {
  const response = await fetch(
    URL + `/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        price: obj.price,
        description: obj.description,
        createdAt: obj.createdAt,
      }),
    }
  );
}
async function createProduct(obj) {
  const response = await fetch(
    URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        price: obj.price,
        description: obj.description,
        createdAt: Date.now(),
      }),
    }
  );
}
export { createProduct, deleteByID, getAll, getByID, updateByID };
