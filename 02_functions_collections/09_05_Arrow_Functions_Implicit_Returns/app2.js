function imprimirLinea() {
    console.log("-------------------------------------------")
}
// Arrow Functions Implicit Returns
// Regular arrow function
const square = n => {
    return n * n;
}
console.log(square(20));
imprimirLinea();

// Implicit return one-line
const square2 = n => n * n;
console.log(square2(30));
imprimirLinea();

// Implicit Return, on multiple lines using parenthesis
const square3 = n => (
    n * n
)
console.log(square3(40));
imprimirLinea();


const nums = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(nums);
imprimirLinea();

// All the three versions give us the same result
const doubles1 = nums.map(function (n) {
    return n * 2;
});
console.log(doubles1);

const doubles2 = nums.map(n => {
    return n * 2;
});
console.log(doubles2);

const doubles3 = nums.map(n => n * 2);
console.log(doubles3);

imprimirLinea();

const parityList = nums.map(function (n) {
    if (n % 2 === 0) return "even";
    return "odd";
});
console.log(parityList);

const parityList2 = nums.map((n) => {
    if (n % 2 === 0) return "even";
    return "odd";
});
console.log(parityList2);

const parityList3 = nums.map((n) => (
    n % 2 === 0 ? "even" : "odd"
));
console.log(parityList3);

const parityList4 = nums.map((n) => n % 2 === 0 ? "even" : "odd");
console.log(parityList4);
