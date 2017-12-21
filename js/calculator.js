var Time = function(horas,minutos,segundos){

	this.horas = horas;
	this.minutos = minutos;
	this.segundos = segundos;

};

//Patrón modular - Pace Calculator
var Calculator = (function(){	

	var TimeConverter = (function(){		

		/** timeToSeconds
		*
		* @param {object}
		* @return {seconds}
		* @description convert time object
		* @example { hours: 1, minutes: 34, seconds: 23} in seconds.
		*/
		function timeToSeconds(obj){

			return (obj.horas*3600) + (obj.minutos*60) + obj.segundos;
		}

		/** secondsToTime
		* @param {Integer}
		* @return {object}
		* @description convert seconds in time object
		* @example { hours: 1, minutes: 34, seconds: 23}.
		*/
		function secondsToTime(seconds){

			var h = Math.floor( seconds/3600 );
	        var m = Math.floor( seconds/60 ) - ( h*60 );
	        var s = seconds - (m*60) - (h*3600);

        return  {
            h : ("0" + h).slice (-2),
            m : ("0" + m).slice (-2),
            s : ("0" + Math.round(s)).slice (-2)
        }
        /*Aquí slice(-2) lo que hace es: si el número es menor que 10 será por ejemplo "0"+1 = "01", así que 'corta' dos posiciones
        desde el final del string, quedándose como está, 01. Sin embargo, si el número es 10 o mayor, será "0" + 20 = "020", entonces
        el slice 'corta' dos posiciones desde el final, quedandose "20". De ésta forma se le da formato al tiempo*/

		}

		return {
			timeToSeconds:timeToSeconds,
			secondsToTime:secondsToTime
		}


	}());


	var DistanceConverter = (function(){		

		/**
		* kmToMeters
		* @param {km}
		* @return {meters}
		* @description convert kilometers in meters.
		*/
		var kmToMeters = function(km){

			var meters = km * 1000;

			return meters;
		}

		/**
		* metersToKm
		* @param {meters}
		* @return {km}
		* @description convert meters in km
		*/
		var metersToKm = function(meters){

			var km = meters / 1000;

			return km;
		}

		/**
		* milesToImperial
		* @param {miles}
		* @return {object}
		* @description convert miles in imperial format
		* @example { miles: 1, yards: 343, feets: 2}.
		*
		*/
		var milesToImperial = function(miles){

			//guardo parte entera para las millas
			var millas = Math.floor(miles);

			//guardo la parte decimal y lo multiplico por 1760 para sacar las yardas
			var decimales = miles - millas;
			decimales = Number(decimales.toFixed(2));
			var yardas = decimales * 1760;

			//guardo la parte decimal de las yardas y lo multiplico por 3 para sacar los pies
			var deci = yardas - Math.floor(yardas);
			var pies = deci * 3;


			return{
				miles:millas,
				yards:Math.floor(yardas),
				feet:Math.floor(pies)
			}

		}
		/**
		* yardsToImperial
		* @param {yards}
		* @return {object}
		* @description convert yards in imperial format
		* @example { miles: 1, yards: 343, feets: 2}.
		*/
		var yardsToImperial = function(yards){

			//paso las yardas a millas 1milla=1760yards
			var millas = yards / 1760;
			//guardo la parte decimal y lo multiplico por 1760 para sacar las yardas
			var decimales = millas - Math.floor(millas);
			decimales = Number(decimales.toFixed(2));
			var yardas = decimales * 1760;

			//guardo la parte decimal de las yardas y lo multiplico por 3 para sacar los pies
			var deci = yardas - Math.floor(yardas);
			var pies = deci * 3;

			return{
				miles:Math.floor(millas),
				yards:Math.floor(yardas),
				feet:Math.floor(pies)
			}

		}
		/**
		* imperialToMiles
		* @param {object}
		* @return {miles}
		* @description convert imperial format
		* @example { miles: 1, yards: 343, feets: 2} in miles.
		*/
		var imperialToMiles = function(obj){

			//millas
			var millas = obj.miles;
			//yardas
			var yardasToMillas = obj.yards / 1760;
			//pies
			var piesToMillas = obj.feet * 0.000189394;

			//sumando todo para sacar Millas
			return millas+yardasToMillas+piesToMillas;
		}
		/**
		* metersToMiles
		* @param {meters}
		* @return {miles}
		* @description convert meters in miles
		*/
		var metersToMiles = function(meters){

			return  meters * 0.000621371;
		}
		/**
		* milesToMeters
		* @param {miles}
		* @return {meters}
		* @description convert miles in meters
		*/
		var milesToMeters = function(miles){

			return miles * 1609.34;
		}

		return{
			kmToMeters:kmToMeters,
			metersToKm:metersToKm,
			milesToImperial:milesToImperial,
			yardsToImperial:yardsToImperial,
			imperialToMiles:imperialToMiles,
			metersToMiles:metersToMiles,
			milesToMeters:milesToMeters
		}

	}());

	/**
	* [paceInKm calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	kilometros]
	* @param {number} timeInSeconds
	* @param {number} distanceInKm
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	var paceInKm = function(timeInSeconds,distanceInKm){

		//kilómetros
		var segundos_km = timeInSeconds / distanceInKm;

		var resultadoFinal_km = TimeConverter.secondsToTime(segundos_km);

		//millas
		var metros = DistanceConverter.kmToMeters(distanceInKm);
		var millas = DistanceConverter.metersToMiles(metros);

		var segundos_mi = timeInSeconds / millas;
		var resultadoFinal_mi = TimeConverter.secondsToTime(segundos_mi);

		//array objetos time, en km y mi
		var array = [resultadoFinal_km,resultadoFinal_mi];

		events.publish("pace-km", array);

		return array;		
	}

	/**
	* [paceInMiles calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	millas]
	* @param {number} timeInSeconds
	* @param {number} distanceInMiles
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	var paceInMiles = function(timeInSeconds,distanceInMiles){

		var segundos_mi = timeInSeconds / distanceInMiles;

		var resultadoFinal_mi = TimeConverter.secondsToTime(segundos_mi);

		//kilometros
		var distancia_km = DistanceConverter.metersToKm(DistanceConverter.milesToMeters(distanceInMiles));

		var segundos_km = timeInSeconds / distancia_km;

		var resultadoFinal_km = TimeConverter.secondsToTime(segundos_km);

		var array = [resultadoFinal_mi,resultadoFinal_km];

		events.publish("pace-mi", array);

		return array;

	}

	/**
	* [markFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en kilometros al ritmo de carrera por kilometro realizado]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	var markFromPacePerKm = function(pacePerKm,distanceInMeters){

		var segundos = TimeConverter.timeToSeconds(pacePerKm);

		var resultado = (segundos * distanceInMeters) / 1000;

		var resultadoFinal = TimeConverter.secondsToTime(resultado);

		events.publish("markFromPacePerKm", resultadoFinal);

		return resultadoFinal;
	}


	/**
	* [markFromPacePerMile: calcula la marca esperada al recorrer la
	distancia en millas al ritmo de carrera por milla realizado]
	* @param {time} pacePerMile
	* @param {imperial} distanceInImperial
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	var markFromPacePerMile = function(pacePerMile,distanceInImperial){

		var segundos = TimeConverter.timeToSeconds(pacePerMile);

		var millas = DistanceConverter.imperialToMiles(distanceInImperial);

		var resultado = segundos * millas;

		var resultadoFinal = TimeConverter.secondsToTime(resultado);

		events.publish("markFromPacePerMile", resultadoFinal);

		return resultadoFinal;
	}

	/**
	* [tableTimeFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en metros al ritmo de carrera por kilometro cada
	cutDistanceInMeters]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @param {number} cutDistanceInMeters
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermedia mark=tiempo de paso en la distancia
	intermedia]
	*/
	var tableTimeFromPacePerKm = function(pacePerKm,distanceInMeters,cutDistanceInMeters){

		var array = []; 

		for (var i = 0; i <= distanceInMeters; i+=cutDistanceInMeters) {

			var o = {distance:i,
					 mark:markFromPacePerKm(pacePerKm,i)
					}

			array.push(o);
		}

		//Si la distancia total es distinta a la última distancia del array, entonces falta recorrido porque no lo cubre el corte. Se calcula la marca sobre la distancia total
		if(distanceInMeters != array[array.length-1].distance){

			var ob = {distance:distanceInMeters,
					  mark:markFromPacePerKm(pacePerKm,distanceInMeters)
					 }
			array.push(ob);
		}		

		events.publish("table-km", array);

		return array;
	}

	/**
	* [tableTimeFromPacePerMile: calcula la marca esperada al recorrer
	la distancia en millas al ritmo de carrera por milla cada
	cutDistanceInYards]
	* @param {time} pacePerMile
	* @param {number} distanceInMiles
	* @param {number} cutDistanceInYards
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermediaImperial mark=tiempo de paso en la
	distancia intermedia]
	*/
	var tableTimeFromPacePerMile = function(pacePerMile,distanceInMiles,cutDistanceInYards){

		var array = []; 

		var milesToYards = distanceInMiles * 1760;

		for (var i = 0; i <= milesToYards; i+=cutDistanceInYards) {

			var o = {distance:DistanceConverter.yardsToImperial(i),
					 mark:markFromPacePerMile(pacePerMile,DistanceConverter.yardsToImperial(i))
					}

			array.push(o);
		}

		//Si la distancia total es distinta a la última distancia del array, entonces falta recorrido porque no lo cubre el corte. Se calcula la marca sobre la distancia total
		if(milesToYards != array[array.length-1].distance){

			var ob = {distance:DistanceConverter.yardsToImperial(milesToYards),
					  mark:markFromPacePerMile(pacePerMile,DistanceConverter.yardsToImperial(milesToYards))
					 }
			array.push(ob);
		}	

		events.publish("table-mi", array);

		return array;
	}

	return{
		TimeConverter:TimeConverter,
		DistanceConverter:DistanceConverter,
		paceInKm:paceInKm,
		paceInMiles:paceInMiles,
		markFromPacePerKm:markFromPacePerKm,
		markFromPacePerMile:markFromPacePerMile,
		tableTimeFromPacePerKm:tableTimeFromPacePerKm,
		tableTimeFromPacePerMile:tableTimeFromPacePerMile,		
	}

}());

