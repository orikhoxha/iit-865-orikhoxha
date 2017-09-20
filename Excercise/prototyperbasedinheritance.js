function Animal(name){
	this.name = name;
}

Animal.prototype.eat = function(){
	console.log(this.name + " eats");
}

function Rabbit(name){
	this.name = name;
}

Rabbit.prototype.jump = function(){
	console.log(this.name + " jump");
}

Rabbit.prototype.__proto__ = Animal.prototype;

let rabbit = new Rabbit("Liridon");
rabbit.eat();
rabbit.jump();