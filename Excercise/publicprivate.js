function Container(param){


	//Private method
	function dec(){
		if(secret > 0){
			secret -= 1;
			return true;
		}else{
			return false;
		}
	}

	this.member = param;
	var secret = 3;
	var that = this;

	this.service = function(){
		return dec() ? that.member : null;
	}
}












