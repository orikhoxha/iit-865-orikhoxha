
var req = require("node-xhr");


req.onreadystatechange = function(){
		if(req.readyState === 4 && req.status === 200){
			var arr = JSON.parse(req.responseText);
			parseData(arr);
		}
}

req.open("GET","http://libertyville.rice.iit.edu/scripts/data-o.php",true);
req.send();

function parseData(arr){
	console.log(arr);
}