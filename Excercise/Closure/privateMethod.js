var counter = (function(){
	var privateCouter = 0;
	function changeBy(val){
		privateCouter += val;
	}

	return{
		increment: function(){
			changeBy(1);
		},

		decrement:function(){
			changeBy(-1);
		},

		value: function(){
			return privateCouter;
		}
	}
})();

