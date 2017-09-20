let animal ={
	eats: true
};

let rabbit = Object.create(animal);

console.log(rabbit.eats);


console.log(Object.getPrototypeOf(rabbit) === animal);

Object.setPrototypeOf(rabbit,{});



let person = {
	walks : true
};

let user = {
	jumps: true,
	__proto__ : person
};

//console.log(Object.keys(person));



//Find only properties of the object
for(let prop in user){
	let isOwn = user.hasOwnProperty(prop);
	console.log(prop  + " is own:" + isOwn);
}