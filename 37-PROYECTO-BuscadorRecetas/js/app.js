const selectCategorias = document.querySelector("#categorias");
const resultado = document.querySelector("#resultado");

selectCategorias.addEventListener('change', seleccionarCategoria);
const modal = new bootstrap.Modal("#modal", {});

function iniciarApp() {
    obtenerCategorias();
}

function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarCategorias(resultado.categories);
        });
}

function mostrarCategorias(categorias = []) {
    categorias.forEach(categoria => {
        const option = document.createElement("OPTION");
        option.value = categoria.strCategory;
        option.textContent = categoria.strCategory;
        selectCategorias.appendChild(option);
    });
}

function seleccionarCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetas(resultado.meals));
}

function mostrarRecetas(recetas = []) {
    limpiarResultados();

    const heading = document.createElement("H2");
    heading.classList.add("text-center", "text-black", "my-5");
    heading.textContent = recetas.length ? "Resultados" : "Ho hay resultados";
    resultado.appendChild(heading);

    recetas.forEach(receta => {
        const {idMeal, strMeal, strMealThumb} = receta;
        const recetaContenedor = document.createElement("DIV");
        recetaContenedor.classList.add('col-md-4');

        const recetaCard = document.createElement("DIV");
        recetaCard.classList.add("card", "mb-4");

        const recetaImagen = document.createElement("IMG");
        recetaImagen.classList.add("card-img-top");
        recetaImagen.alt = `Imagen de la receta ${strMeal}`;
        recetaImagen.src = strMealThumb;

        const recetaCardBody = document.createElement("DIV");
        recetaCardBody.classList.add("card-body");

        const recetaCardHeading = document.createElement("H3");
        recetaCardHeading.classList.add("card-title", "mb-3");
        recetaCardHeading.textContent = strMeal;

        const recetaCardButton = document.createElement("BUTTON");
        recetaCardButton.classList.add("btn", "btn-danger", "w-100");
        recetaCardButton.textContent = "Ver Receta";
        // recetaCardButton.dataset.bsTarget = "#modal";
        // recetaCardButton.dataset.bsToggle = "modal";
        recetaCardButton.onclick = function () {
            seleccionarReceta(idMeal);
        }

        recetaCardBody.appendChild(recetaCardHeading);
        recetaCardBody.appendChild(recetaCardButton);

        recetaCard.appendChild(recetaImagen);
        recetaCard.appendChild(recetaCardBody);

        recetaContenedor.appendChild(recetaCard);

        resultado.appendChild(recetaContenedor);
    })
}

function limpiarResultados() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function seleccionarReceta(id) {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaModal(resultado.meals[0]));
}

function mostrarRecetaModal(receta) {
    const {idMeal, strInstructions, strMeal, strMealThumb} = receta;
    // Añadir contenido al Modal
    const modalTitle = document.querySelector(".modal .modal-title");
    const modalBody = document.querySelector(".modal .modal-body");

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = `
        <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
        <h3 class="my-3">Instrucciones</h3>
        <p>${strInstructions}</p>
        <h3 class="my-3">Ingredientes y cantidades</h3>
    `;

    const listGroup = document.createElement("UL");
    listGroup.classList.add("list-group");

    // Mostrar ingredientes y cantidades
    for (let i = 1; i < 20; i++) {
        if (receta[`strIngredient${i}`]) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            const ingredienteLi = document.createElement("LI");
            ingredienteLi.classList.add("list-group-item");
            ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

            listGroup.appendChild(ingredienteLi);
        }
    }
    modalBody.appendChild(listGroup);
    modal.show();
}

document.addEventListener("DOMContentLoaded", iniciarApp);