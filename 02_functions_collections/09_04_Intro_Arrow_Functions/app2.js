function imprimirLinea() {
    console.log("-------------------------------------------")
}

// Non arrow function expression
// const square = function (x) {
//     return x * x;
// }

// Equivalent arrow function
const square = (x) => {
    return x * x;
}

console.log(square(5));
imprimirLinea();

// Parenthesis are option whe you have one parameter
const isEven = num => {
    return num % 2 === 0;
}
console.log(isEven(10));
console.log(isEven(13));
imprimirLinea();

// Must include parenthesis for multiple parameters
const multiply = (a, b) => {
    return a * b;
}

console.log(multiply(5, 6));
console.log(multiply(8, 4));
imprimirLinea();

// Must include parenthesis for zero parameters
const greet = () => {
    console.log("HI");
}

greet();
