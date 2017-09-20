//Use _variable when you access only from inside of code
function User(name, birthday){
	this._name = name;
	this._birthday = birthday;
}

User.prototype._calcAge = function(){
	return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function(){
	return this._name + ", age:" + this._calcAge();
};

let user = new User("Orik",new Date(1992,4,20));

console.log(user.sayHi());

