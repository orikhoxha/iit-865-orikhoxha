

var user = {
	name : "John"
};


user.name = "Macky";

Object.defineProperty(user,"name",{
	writable : false
});

//Override the previous writable
Object.defineProperty(user,"name",{
	writable : true
});


user.name = "Trecky";


var person = {};


//Writable is by default false
Object.defineProperty(person,"name",{
	value : "Orik",
	enumerable : true,
	configurable :  true
});

console.log(person.name);

person.name = "Oket";
//Cannot change, writable : false
console.log(person.name);


var subject = {
	description : "Rich Internet Apps"
}


//Iterates only thrug
Object.defineProperty(subject,"toString",{
	enumerable : false
});

console.log(Object.keys(subject));

for(var key in subject) console.log(key);


//Create constant of an object
Object.defineProperty(subject,"description",{
	writable: false,
	configurable: false
});


console.log(subject.description);

console.log(Object.getOwnPropertyDescriptor(subject,"description"));

// Objet.defineProperty(subject,"description",{writable:true});


// console.log(subject.description);









