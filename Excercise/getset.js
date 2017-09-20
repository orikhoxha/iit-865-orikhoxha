let user = {
	name: "Orik",
	surname: "Hoxha",

	get Name(){
		return this.name;
	},

	set Name(val){
		this.name = val;
	}

}

//Define properties get,set with defineProperty
var person = {
	name: "Orik",
	surname: "Hoxha"
};


Object.defineProperty(person,"fullName",{
	get(){
		return this.name + " " + this.surname;
	},

	set(val){
		[this.name,this.surname] = val.split(" ");
	}
});


for(var key in person) console.log(key);

console.log(person.fullName);





