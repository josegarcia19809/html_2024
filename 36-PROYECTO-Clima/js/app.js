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
    Spinner();

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
    const {name, main: {temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const tempMax = kelvinACentigrados(temp_max);
    const tempMin = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add("font-bold", "text-xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Temperatura máxima: ${tempMax} &#8451;`;
    tempMaxima.classList.add("font-bold", "text-xl");

    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Temperatura mínima: ${tempMin} &#8451;`;
    tempMinima.classList.add("font-bold", "text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const kelvinACentigrados = gradosK => parseInt(gradosK - 273.15);

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");
    divSpinner.innerHTML = `
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}




