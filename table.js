let currentPage = 1;
const productsPerPage = 20;
let totalProducts = 0;
let search = "";
let category = "";

async function fetchProducts(page = 1, search = "", category = "") {
  try {
    const skip = (page - 1) * productsPerPage;
    let url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${productsPerPage}&skip=${skip}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${skip}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    totalProducts = data.total;

    renderTable(data.products);
    createPagination();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderTable(products) {
  let tableData = "";
  products.forEach((product) => {
    const url = new URL("product.html", window.location.origin);

    url.searchParams.set("id", product.id);

    tableData += `<tr>
                    <td>${product.id}</td>
                    <td><a href="${url.toString()}" target="_blank">${
      product.title
    }</a></td>
                    <td>${product.category}</td>
                    <td>${product.rating}</td>
                    <td>$${product.price}</td>
                  </tr>`;
  });

  document.getElementById("table_body").innerHTML = tableData;
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
      fetchProducts(currentPage, search, category);
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

async function searchProducts() {
  search = document.getElementById("myInput").value;
  currentPage = 1;
  await fetchProducts(currentPage, search, category);
}

document.getElementById("myInput").addEventListener("keyup", searchProducts);

async function fetchCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();
    console.log(categories);

    populateCategoryDropdown(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function populateCategoryDropdown(categories) {
  const dropdown = document.getElementById("categoryDropdown");

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.slug;
    option.textContent = category.name;
    dropdown.appendChild(option);
  });
}

document
  .getElementById("categoryDropdown")
  .addEventListener("change", function () {
    category = this.value;
    currentPage = 1;
    fetchProducts(currentPage, search, category);
  });

fetchCategories();
fetchProducts(currentPage, search, category);
