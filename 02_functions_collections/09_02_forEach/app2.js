const numbers = [20, 21, 22, 23, 24, 25, 26, 27];

function imprimirLinea() {
    console.log("-------------------------------------------")
}

// Usando una función anónima
numbers.forEach(function (num) {
    console.log(num * 2);
})
imprimirLinea();


// Usando una función pre-definida
function tripleN(n) {
    console.log(n * 3);
}

numbers.forEach(tripleN);
imprimirLinea();

// Usando el index:
numbers.forEach(function (num, idx) {
    console.log(idx, num)
});
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

// Imprimir solo los títulos
books.forEach((book) => {
    console.log(book.title.toUpperCase());
});
imprimirLinea();

// Imprimir solo los títulos usando for...of
for (let book of books) {
    console.log(book.title);
}
imprimirLinea();
// Imprimir solo los títulos usando un ciclo for
for (let i = 0; i < books.length; i++) {
    console.log(books[i].title.toUpperCase());
}