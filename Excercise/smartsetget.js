

//Gain control over property values, _name is an internal property and shouldn't be touched from outside
var user = {
	get name(){
		return this._name;
	},

	set name(val){
		if(val.length < 4){
			console.log("Name too short");
			return;
		}
		this._name = val;
	}
}

user.name = "Orik";

console.log(user.name);
