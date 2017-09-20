function Rabbit(name){
	this.name = name;
}


let rabbit  = new Rabbit("White rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");

console.log(rabbit2.name);