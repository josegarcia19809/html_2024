"use strict"

const btnAPI = document.querySelector("#btn_api");
// Recuperar el cuerpo de la tabla
let listaAlumnos = document.querySelector("#lista-alumnos tbody");

btnAPI.addEventListener("click", function (e) {
    const ip="192.168.43.39";
    const puerto = 5001;
    e.preventDefault();
    fetch(`http://${ip}:${puerto}/`)
        .then(res => res.json())
        .then(promedios => {
            promedios.forEach(promedio => {
                //Construir el template
                const row = document.createElement("tr");
                row.innerHTML = `
                <td><img src= "http://${ip}:${puerto}/obtener-imagen/${promedio.Fotografia}" 
                width=50 height=50></td>
                <td>${promedio.NoCuenta}</td>
                <td>${promedio.Nombre}</td>
                <td>${promedio.Carrera}</td>
                <td>${promedio.Promedio}</td>
                `;
                listaAlumnos.appendChild(row);
            });

        })
        .catch(error => console.log(error));
});

