const selectCategorias = document.querySelector("#categorias");
const resultado = document.querySelector("#resultado");

selectCategorias.addEventListener('change', seleccionarCategoria);

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

document.addEventListener("DOMContentLoaded", iniciarApp);