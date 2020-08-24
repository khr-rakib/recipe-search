const APP_ID = "e78e6f32";
const APP_KEY = "d07f4d27d04085d347510bf2609c2394";
const recipesContainer = document.getElementById("recipesContainer");

const searchInput = document.getElementById("searchInput");

let searchValue = "chicken";

searchInput.addEventListener("keypress", (e) => {
  recipesContainer.innerHTML = "";

  if (e.key === "Enter") {
    const searchValue = searchInput.value;
    initialRecipes(searchValue);
  }
});

function showRecipeInDOM(recipes) {
  recipes.map((data) => {
    const divCreate = document.createElement("div");
    divCreate.classList = "col-md-4 mb-4";

    divCreate.innerHTML = `
        <div class="card pt-3 text-center">
            <img
            class="img-position"
            src="${data.recipe.image}"
            class="card-img-top"
            alt="..."
            />
            <div class="card-body">
            <h5 class="card-title">${data.recipe.label}</h5>
            <ul class="list-group list-group-flush">
                ${data.recipe.ingredientLines.map(
                  (lines) =>
                    `<li class="list-group-item card-text">${lines}</li>`
                )}                    
            </ul>
            </div>
        </div>
    `;
    recipesContainer.appendChild(divCreate);
  });
}

function initialRecipes(searchValue) {
  fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}`
  )
    .then((res) => res.json())
    .then((data) => showRecipeInDOM(data.hits));
}

window.addEventListener("load", () => {
  initialRecipes(searchValue);
});
