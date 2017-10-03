
function makeAdder(x){
	return function(y){
		return x + y;
	}
}


var add5 = makeAdder(5);// return function and store the x
var add10 = makeAdder(10);// return function and store the x

console.log(add5(2));
console.log(add10(2));


