var objectHistory = function(type, units, pace, distance, mark){
	this.type = type;
	this.units = units;
	this.pace = pace;
	this.distance = distance;
	this.mark = mark;
}

var CalculatorHistory = (function(){

	var array_historial = [];

	function add(objectHistory){

		var pos = array_historial.push(objectHistory) -1;

		return pos;
	}

	function myDelete(indice){

		array_historial.splice(indice,1);

	}

	function getValues(){

		events.publish("mostrarHistorial", array_historial);

		return array_historial;
	}

	return{
		add:add,
		myDelete:myDelete,
		getValues:getValues
	}

})();