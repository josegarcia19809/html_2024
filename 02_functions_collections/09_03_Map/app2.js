const numbers = [20, 21, 22, 23, 24, 25, 26, 27];
const words = ['mapa', 'avion', 'mosca', 'volar'];

function imprimirLinea() {
    console.log("-------------------------------------------")
}

//Map crea una nueva matriz llamando a su función de devolución de llamada con cada elemento
// de la matriz original.

const valoresAlCuadrado = numbers.map((num) => {
    return num * 2;
});

console.log(valoresAlCuadrado);
imprimirLinea();

const valoresPares = numbers.map((num) => {
    return {
        valor: num,
        esPar: num % 2 === 0
    }
});
console.log(valoresPares);

`
0: 
{valor: 20, esPar: true}
1: 
{valor: 21, esPar: false}
2: 
{valor: 22, esPar: true}
3: 
{valor: 23, esPar: false}
4: 
{valor: 24, esPar: true}
5: 
{valor: 25, esPar: false}
6: 
{valor: 26, esPar: true}
7: 
{valor: 27, esPar: false}
`
imprimirLinea();

const deletrear = words.map((word) => {
    return word.toUpperCase().split('').join('.');
});

console.log(deletrear); // ['M.A.P.A', 'A.V.I.O.N', 'M.O.S.C.A', 'V.O.L.A.R']
imprimirLinea();

const books = [
    {
        title: 'Good Omens',
        authors: ['Terry Pratchett', 'Neil Gaiman'],
        rating: 4.25
    },
    {
        title: 'Bone: The Complete Edition',
        authors: ['Jeff Smith'],
        rating: 4.42
    },
    {
        title: 'American Gods',
        authors: ['Neil Gaiman'],
        rating: 4.11
    },
    {
        title: 'A Gentleman in Moscow',
        authors: ['Amor Towles'],
        rating: 4.36
    }
]

// Recuperar solo los titulos
const titulos = books.map((book) => {
    return book.title;
});

console.log(titulos);
// ['Good Omens', 'Bone: The Complete Edition', 'American Gods', 'A Gentleman in Moscow']