self.addEventListener('message',function(){

	var link = "http://libertyville.rice.iit.edu/scripts/data.php";

	var data = "";

	var dataParsed;
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
			if(req.readyState === 4 && req.status === 200){
				dataParsed = JSON.parse(req.responseText);
				self.postMessage(dataParsed);
			}
	}
	req.open("GET",link,true);
	req.send();

},false);