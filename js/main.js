calculatorView.init();
CalculatorHistoryView.init();

document.getElementById("calcular_pace").addEventListener("click",function(){

	var timeInSeconds = Calculator.TimeConverter.timeToSeconds(calculatorView.getTime());

	var distance = calculatorView.getDistance();

	if (calculatorView.getModo() == "km"){

		Calculator.paceInKm(timeInSeconds, distance);

		//Cuando se calcula el pace, se crea el objeto objectHistory y se mete en el array
		var obj = new objectHistory("pace","km",calculatorView.getTimePace(),Calculator.DistanceConverter.kmToMeters(distance),calculatorView.getTime());

		CalculatorHistory.add(obj);

	} 
	else{

		Calculator.paceInMiles(timeInSeconds, distance);

		var obj = new objectHistory("pace","mi",calculatorView.getTimePace(),distance,calculatorView.getTime());

		CalculatorHistory.add(obj);
	} 

});

document.getElementById("calcular_marca").addEventListener("click", function(){

	if (calculatorView.getModo() == "km"){

		Calculator.markFromPacePerKm(calculatorView.getTimePace(),Calculator.DistanceConverter.kmToMeters(calculatorView.getDistance()));

		var obj = new objectHistory("mark","km",calculatorView.getTimePace(),Calculator.DistanceConverter.kmToMeters(calculatorView.getDistance()),calculatorView.getTime());

		CalculatorHistory.add(obj);
	}  
	else{

		Calculator.markFromPacePerMile(calculatorView.getTimePace(), Calculator.DistanceConverter.milesToImperial(calculatorView.getDistance()));

		var obj = new objectHistory("mark","mi",calculatorView.getTimePace(),calculatorView.getDistance(),calculatorView.getTime());
		
		CalculatorHistory.add(obj);

	} 	

});

document.getElementById("calcular_tabla").addEventListener("click", function(){

	var corte = parseInt(document.getElementById("corte").value);

	if (calculatorView.getModo() == "km") Calculator.tableTimeFromPacePerKm(calculatorView.getTimePace(),Calculator.DistanceConverter.kmToMeters(calculatorView.getDistance()),corte);
	else Calculator.tableTimeFromPacePerMile(calculatorView.getTimePace(),calculatorView.getDistance(),corte);


});

document.getElementById("mostrar_historial").addEventListener("click", function(){

	CalculatorHistory.getValues();
});