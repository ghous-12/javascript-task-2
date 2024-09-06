const productContainer = document.querySelector("#product-container");
const loader = document.querySelector("#loader");

async function fetchDisplaySingleProduct() {
  loader.style.display = "flex";

  const productID = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(`https://dummyjson.com/products/${productID}`);
  const product = await response.json();

  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);

  displayProducts(product);
  reviews(product);
}

fetchDisplaySingleProduct();

function displayProducts(product) {
  productContainer.innerHTML = `
    <div>
      <img src="${product.images[0]}" alt="${product.title}"/> 
    </div>
    <div class="text">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <div>
        <h3>Rating:</h3>
        <p>${product.rating}/5</p>
      </div>
      <div>
        <h3>Price:</h3>
        <p>${product.price}</p>
      </div>
      <button type="submit" class="cart">Add To Cart</button>
      <button type="submit" class="buy">Buy Now</button>
    </div>`;
}

//=======================================================

const toggleBtn = document.querySelector("#theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.checked = true;
} else {
  body.classList.add("light-mode");
}

toggleBtn.addEventListener("change", function () {
  if (toggleBtn.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});

//=============================================================

const productReviews = document.getElementById("product-reviews");

function reviews(product) {
  let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const allReviews = storedReviews.concat(product.reviews || []);

  productReviews.innerHTML = allReviews
    .map(
      (review) => `
      <div class="review-card">
        <stan>${review.reviewerName || review.name}</stan>
        <stan>${review.date}</stan>
        <stan>${review.rating} out of 5</stan>
        <stan>${review.comment || review.review}</stan>
      </div>`
    )
    .join("");
}

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const date = document.getElementById("date").value;
  const review = document.getElementById("review").value;

  const reviewData = {
    reviewerName: name,
    rating: rating,
    date: date,
    comment: review,
  };

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  console.log(reviews);
  reviews.push(reviewData);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  document.getElementById("name").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("date").value = "";
  document.getElementById("review").value = "";

  displayReviews();
  event();
});

function displayReviews() {
  const reviewsContainer = document.getElementById("product-reviews");
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  reviewsContainer.innerHTML += reviews
    .map(
      (review) => `
      <div class="review-card">
        <stan>${review.reviewerName}</stan>
        <stan>${review.date}</stan>
        <stan>${review.rating} out of 5</stan>
        <stan>${review.comment}</stan>
      </div>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", displayReviews);
