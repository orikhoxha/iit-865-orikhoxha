var mySingleton = (function(){

	//Stores a variable to the Singleton
	var instance;

	function init(){

		function privateMethod(){
			console.log("I am private");
		}

		var privateVariable = "I am also private";

		var privateRandomNumber = Math.random();


		return{
			publicMethod: function(){
				console.log("The public can see me");
			
			},

			publicProperty : "I am also public",

			getRandomNumber: function(){
				return privateRandomNumber;
			}
		};
	}

	return {
		//Get the singleton instance if one exists
		//or create one if it doesn't
		getInstance: function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	}

})();


var a = mySingleton.getInstance();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber());
console.log(singleB.getRandomNumber());
console.log(singleA.publicProperty);
console.log(singleA.publicProperty);