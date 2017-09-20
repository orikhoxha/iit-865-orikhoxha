var animal = {
	eats:true,
	walk(){
		return "Animal Walk";
	}
};

let rabbit = {
	jumps:true,
	__proto__ : animal
};


let longEar = {
	earLength : 10,
	__proto__ : rabbit
}

let user = {
	name : "Orik",
	surname : "Hoxha",

	set fullName(value){
		[this.name,this.surname] = value.split(" ");
	},

	get fullName(){
		return this.name + " " + this.surname;
	}
};


let admin = {
	__proto__:user,
	isAdmin:true
}

console.log(admin.fullName);

admin.fullName = "Oket Hoxha";

console.log(admin.fullName);







