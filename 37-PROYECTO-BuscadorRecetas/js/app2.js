const resultado = document.querySelector("#resultado");
const modal = new bootstrap.Modal("#modal", {});

function iniciarAppFavoritos() {
    obtenerFavoritos();
}

function obtenerFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    if (favoritos.length) {
        mostrarRecetasFavoritas(favoritos);
        return
    }
    const noHayFavoritos = document.createElement("P");
    noHayFavoritos.textContent = "No hay favoritos aún";
    noHayFavoritos.classList.add("fs-4", "text-center", "font-bold", "mt-5");
    resultado.appendChild(noHayFavoritos);
}

function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}

function mostrarRecetasFavoritas(recetas = []) {
    limpiarHTML(resultado);
    const heading = document.createElement("H2");
    heading.classList.add("text-center", "text-black", "my-5");
    heading.textContent = recetas.length ? "Resultados" : "Ho hay resultados";
    resultado.appendChild(heading);

    recetas.forEach(receta => {
        const {id, titulo, img} = receta;
        const recetaContenedor = document.createElement("DIV");
        recetaContenedor.classList.add('col-md-4');

        const recetaCard = document.createElement("DIV");
        recetaCard.classList.add("card", "mb-4");

        const recetaImagen = document.createElement("IMG");
        recetaImagen.classList.add("card-img-top");
        recetaImagen.alt = `Imagen de la receta ${titulo}`;
        recetaImagen.src = img;

        const recetaCardBody = document.createElement("DIV");
        recetaCardBody.classList.add("card-body");

        const recetaCardHeading = document.createElement("H3");
        recetaCardHeading.classList.add("card-title", "mb-3");
        recetaCardHeading.textContent = titulo;

        const recetaCardButton = document.createElement("BUTTON");
        recetaCardButton.classList.add("btn", "btn-danger", "w-100");
        recetaCardButton.textContent = "Ver Receta";
        recetaCardButton.onclick = function () {
            seleccionarReceta(id);
        }

        recetaCardBody.appendChild(recetaCardHeading);
        recetaCardBody.appendChild(recetaCardButton);

        recetaCard.appendChild(recetaImagen);
        recetaCard.appendChild(recetaCardBody);

        recetaContenedor.appendChild(recetaCard);

        resultado.appendChild(recetaContenedor);
    })
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

    // Para agregar los botones de Favorito y Cerrar
    const modalFooter = document.querySelector(".modal-footer");
    limpiarHTML(modalFooter);

    const btnCerrarModal = document.createElement("BUTTON");
    btnCerrarModal.classList.add("btn", "btn-secondary", "col");
    btnCerrarModal.textContent = "Cerrar";
    btnCerrarModal.onclick = function () {
        modal.hide();
    }

    modalFooter.appendChild(btnCerrarModal);


    modal.show();
}

document.addEventListener("DOMContentLoaded", iniciarAppFavoritos);