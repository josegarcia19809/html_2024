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
}

function mostrarAlerta(mensaje) {


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