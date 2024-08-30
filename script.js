// let currentPage = 1;
// const productsPerPage = 20;
// let allProducts = [];

// fetch("https://dummyjson.com/products?limit=194")
//   .then((response) => response.json())
//   .then((data) => {
//     allProducts = data.products;
//     displayProducts(currentPage);
//     createPagination();
//   });

// function displayProducts(page) {
//   const startIndex = (page - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const paginatedProducts = allProducts.slice(startIndex, endIndex);

//   let tableData = "";
//   paginatedProducts.forEach((product) => {
//     tableData += `<tr>
//                     <td>${product.id}</td>
//                     <td>${product.category}</td>
//                     <td>${product.title}</td>
//                     <td>${product.rating}</td>
//                     <td>${product.price}</td>
//                   </tr>`;
//   });

//   document.getElementById("table-body").innerHTML = tableData;
// }

// function createPagination() {
//   const totalPages = Math.ceil(allProducts.length / productsPerPage);
//   const btnContainer = document.getElementById("pagination");
//   btnContainer.innerHTML = "";

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement("button");
//     button.className = "button";
//     button.innerText = i;
//     button.addEventListener("click", function () {
//       currentPage = i;
//       displayProducts(currentPage);
//       setActiveButton(i);
//     });
//     btnContainer.appendChild(button);
//   }

//   setActiveButton(currentPage);
// }

// function setActiveButton(page) {
//   const buttons = document.getElementsByClassName("button");
//   Array.from(buttons).forEach((btn) => btn.classList.remove("active"));
//   buttons[page - 1].classList.add("active");
// }

// function searchProducts() {
//   const input = document.getElementById("myInput");
//   const filter = input.value.toUpperCase();
//   const filteredProducts = allProducts.filter((product) =>
//     product.title.toUpperCase().includes(filter)
//   );

//   let tableData = "";
//   filteredProducts.forEach((product) => {
//     tableData += `<tr>
//                     <td>${product.id}</td>
//                     <td>${product.category}</td>
//                     <td>${product.title}</td>
//                     <td>${product.rating}</td>
//                     <td>${product.price}</td>
//                   </tr>`;
//   });

//   document.getElementById("table-body").innerHTML = tableData;
// }

// document.getElementById("myInput").addEventListener("keyup", searchProducts);

let currentPage = 1;
const productsPerPage = 20;
let allProducts = [];
let totalProducts = 0;

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    totalProducts = data.total;
    return fetch(`https://dummyjson.com/products?limit=${totalProducts}`);
  })
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    displayProducts(currentPage);
    createPagination();
  });

function displayProducts(page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  let tableData = "";
  paginatedProducts.forEach((product) => {
    tableData += `<tr>
                    <td>${product.id}</td>
                    <td>${product.category}</td>
                    <td>${product.title}</td>
                    <td>${product.rating}</td>
                    <td>${product.price}</td>
                  </tr>`;
  });

  document.getElementById("table-body").innerHTML = tableData;
}

function createPagination() {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const btnContainer = document.getElementById("pagination");
  btnContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "button";
    button.innerText = i;
    button.addEventListener("click", function () {
      currentPage = i;
      displayProducts(currentPage);
      setActiveButton(i);
    });
    btnContainer.appendChild(button);
  }

  setActiveButton(currentPage);
}

function setActiveButton(page) {
  const buttons = document.getElementsByClassName("button");
  Array.from(buttons).forEach((btn) => btn.classList.remove("active"));
  buttons[page - 1].classList.add("active");
}

function searchProducts() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const paginationDiv = document.getElementById("pagination");

  if (filter) {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toUpperCase().includes(filter)
    );

    let tableData = "";
    filteredProducts.forEach((product) => {
      tableData += `<tr>
                      <td>${product.id}</td>
                      <td>${product.category}</td>
                      <td>${product.title}</td>
                      <td>${product.rating}</td>
                      <td>${product.price}</td>
                    </tr>`;
    });

    document.getElementById("table-body").innerHTML = tableData;

    paginationDiv.classList.add("hidden");
  } else {
    displayProducts(currentPage);

    paginationDiv.classList.remove("hidden");
  }
}

document.getElementById("myInput").addEventListener("keyup", searchProducts);
