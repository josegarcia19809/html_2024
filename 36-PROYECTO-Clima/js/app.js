const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    console.log("Buscando clima...");
    // Validar los datos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    // Crear una alerta
    // Primero buscar la alerta
    const existeAlerta = document.querySelector(".alerta");
    if (!existeAlerta) {
        const alerta = document.createElement("div");
        alerta.classList.add("alerta", "bg-red-100", "border-red-400", "text-red-700",
            "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);
        // Se elimina la alerta después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    const appID = '4dd264d917e7f132a04b2fd079b3e1d5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();

            if (datos.cod === "404") {
                mostrarError("Ciudad no encontrada");
                return;
            }
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const {main: {temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp)
    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const kelvinACentigrados = gradosK => parseInt(gradosK - 273.15);






