//Break and return don't work with forEach
var i = ["Orik","Oket","Liridon","Petrit"];

var k = [{name : "Orik", phoneNumbers : ["044444443", "1234567"],lastName : "Hoxha"},
		 {name : "Orik", phoneNumbers : ["044444442", "1234567"], lastName : "Hoxha"},
		 {name : "Orik", phoneNumbers : ["044444441", "1234567"], lastName : "Hoxha"} 
		 ]

console.log(k.some(function(elem){
	return elem.phoneNumbers.some(function(phoneNumber){
		return phoneNumber === "044444444";
	});
}));	




var obj = {boo : "Hello", foo : 2};


// var k = JSON.stringify(obj);

var t = JSON.stringify(k);

console.log(t);


