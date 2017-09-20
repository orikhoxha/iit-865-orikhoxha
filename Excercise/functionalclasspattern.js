//Only properties assigned with this keyword are public
function User(name, birthday){


	function calcAge(){
		return new Date().getFullYear() - birthday.getFullYear();
	}


	this.sayHi = function(){
		console.log(name + ", age: " + calcAge());
	}
}

let user = new User("Orik",new Date(1992,4,20));
user.sayHi();


