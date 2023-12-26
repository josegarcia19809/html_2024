const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");


window.onload = () => {
    formulario.addEventListener("submit", validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();
    const terminoBusqueda = document.querySelector("#termino").value;
    if (terminoBusqueda === "") {
        mostrarAlerta("Agrega un termino de búsqueda");
        return;
    }
    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector(".mi-alerta");
    if (!existeAlerta) {
        const alerta = document.createElement("P");
        alerta.classList.add("mi-alerta", "bg-red-100", "border-red-400", "text-red-700",
            "px-4", "py-3",
            "rounded", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
    `;
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

function buscarImagenes(termino) {
    const key = "24981196-c53eacfd1b6609fc75811c6f5";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits);
        });
}

function mostrarImagenes(imagenes) {
    console.log(imagenes)
}