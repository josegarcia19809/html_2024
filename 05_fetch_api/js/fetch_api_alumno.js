"use strict"

// Recuperar el cuerpo donde se insertará la tarjeta
let alumno_tarjeta = document.querySelector("#alumno");

// Recuperar el parámetro de la URL
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const no_cuenta = urlParams.get('no_cuenta');

// Este evento se lanza al cargar la página
document.addEventListener('DOMContentLoaded', function (e) {
    const ip = "127.0.0.1";
    const puerto = 5001;
    e.preventDefault();
    fetch(`http://${ip}:${puerto}/obtener-info-alumno/${no_cuenta}`)
        .then(res => res.json())
        .then(alumno => {
            alumno_tarjeta.innerHTML = `
                <div class="card w-75" >
                <img src="http://${ip}:${puerto}/obtener-imagen/${alumno.Fotografia}" 
                    class="card-img-top" alt="alumno">
                <div class="card-body">
                  <h5 class="card-title">${alumno.Nombre}</h5>
                  <p class="card-text"><b>Carrera:</b> ${alumno.Carrera}</p>
                  <p class="card-text"><b>No Cuenta:</b> ${alumno.NoCuenta}</p>
                  <p class="card-text"><b>Promedio:</b> ${alumno.Promedio}</p>
                </div>
              </div>
            `;
        })
        .catch(error => console.log(error));
});

