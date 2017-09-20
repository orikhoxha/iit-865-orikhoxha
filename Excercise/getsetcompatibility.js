function User(name,birthday){
	this.name = name;
	this.birthday = birthday;

	Object.defineProperty(this,"age",{
		get(){
			var todayYear = new Date().getFullYear();
			return todayYear - this.birthday.getFullYear();
		}
	});
}

var orik = new User("Orik",new Date(1992,4,20));
console.log(orik.age);
console.log(orik.birthday);

console.log(Object.getOwnPropertyDescriptor(orik,"age"));


