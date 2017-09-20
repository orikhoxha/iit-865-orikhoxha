//factory pattern
function User(name, birthday){


	function calcAge(){
		return new Date().getFullYear() - birthday.getFullYear();
	}

	return{
		sayHi(){
			console.log(name + ", age: " + calcAge());
		}
	}
}


let user = new User("Orik",new Date(1992,4,20));
user.sayHi();