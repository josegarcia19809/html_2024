//leer la criptomoneda seleccionada
const criptomonedaSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");

const formulario = document.querySelector("#formulario");


const objBusqueda = {
    moneda: "",
    criptomoneda: ""
}

document.addEventListener("DOMContentLoaded", () => {
    consultarCriptomonedas();
    formulario.addEventListener("submit", submitFormulario);
    criptomonedaSelect.addEventListener("change", leerValor);
    monedaSelect.addEventListener("change", leerValor);
})

function submitFormulario(e) {
    e.preventDefault();

    // Validar
    const {moneda, criptomoneda} = objBusqueda;
    if (moneda === "" || criptomoneda === "") {
        mostrarAlerta("Ambos campos son obligatorios");
        return;
    }

    // Consultar la API con los resultados
    consultarAPI();
}

function consultarAPI() {
    const {moneda, criptomoneda} = objBusqueda;
    const parametros=`pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const url = `https://min-api.cryptocompare.com/data/${parametros}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        });

}

function mostrarCotizacionHTML(cotizacion) {
    console.log(cotizacion)
}

function mostrarAlerta(mensaje) {
    const existeError = document.querySelector(".error");
    if (!existeError) {
        const divMensaje = document.createElement("DIV");
        divMensaje.classList.add("error");
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function consultarCriptomonedas() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement("OPTION");
        option.value = Name;
        option.textContent = FullName;
        criptomonedaSelect.appendChild(option);
    });
}

// Crear un Promise
const obtenerCriptomonedas = (criptomonedas) => new Promise(resolve => {
    resolve(criptomonedas);
})