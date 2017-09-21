let obj = {};

console.log(obj.__proto__ === Object.prototype);


let arr = [];

console.log(arr.__proto__.__proto__ === Object.prototype);

function f(){}

console.log(f.__proto__ === Function.prototype);
console.log(f.__proto__.__proto__ === Object.prototype);



console.log("Orik".repeat(3));


