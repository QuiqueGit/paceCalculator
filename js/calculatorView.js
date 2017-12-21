//vista del modelo de la calculadora

var calculatorView = (function (){

	function getModo(){

		var modo = document.querySelector('input[name="options"]:checked').value; //opción kilometros o millas

		return modo;
	};

	function getDistance(){

		var distancia = document.getElementById("distancia").value;

		distancia = distancia.replace(',','.');

		return parseFloat(distancia);
	};

	function getTime(){

		var horas = parseInt(document.getElementById("horas").value);
		var minutos = parseInt(document.getElementById("minutos").value);
		var segundos = parseInt(document.getElementById("segundos").value);

		return new Time(horas,minutos,segundos);
	};

	function getTimePace(){

		var horas = parseInt(document.getElementById("horas_pace").value);
		var minutos = parseInt(document.getElementById("minutos_pace").value);
		var segundos = parseInt(document.getElementById("segundos_pace").value);

		return new Time(horas,minutos,segundos);
	};

	function _2digits(value){
		return value <10 ? "0" + value : value;
	};

	function createTable(array,modo){
		//la tabla de las distancias con su tiempo va a ser igual tanto para km como para millas, lo único que cambia es el formato de la distancia, por eso le paso el modo:
		//si es km, muestra la distancia tal cual, en metros, si es otra cosa ("millas"), formateo la distancia porque recibo un objeto en formato imperial.		

		document.getElementById("resultados").innerHTML = ""; //limpiar div resultados si ya hay datos mostrados

		//imprimir array en forma de tabla en la sección resultados de la interfaz
		var miTabla = document.createElement("table");
		miTabla.setAttribute("class", "table table-sm");

		var th_header = document.createElement("th");
		var th2_header = document.createElement("th");

		th_header.innerHTML = (modo=="km") ? "Metros" : "Distancia";
		th2_header.innerHTML = "Marca";

		miTabla.appendChild(th_header);
		miTabla.appendChild(th2_header);

		if(modo === "km"){

			for (var i = 0; i < array.length; i++) {

				var tr = document.createElement("tr");
				var td = document.createElement("td");
				var td2 = document.createElement("td");

				td.innerHTML = array[i].distance;
				td2.innerHTML = array[i].mark.h+":"+array[i].mark.m+":"+array[i].mark.s;

				tr.appendChild(td);
				tr.appendChild(td2);

				miTabla.appendChild(tr);
			}

		}else{
			for (var i = 0; i < array.length; i++) {

				var tr = document.createElement("tr");
				var td = document.createElement("td");
				var td2 = document.createElement("td");

				td.innerHTML = "Mls:&nbsp;" + array[i].distance.miles + "&ensp;Yds:&nbsp;" + array[i].distance.yards + "&nbsp;Feet:&ensp;" + array[i].distance.feet;
				td2.innerHTML = array[i].mark.h+":"+array[i].mark.m+":"+array[i].mark.s;

				tr.appendChild(td);
				tr.appendChild(td2);

				miTabla.appendChild(tr);
			}

		}
		document.getElementById("resultados").appendChild(miTabla);
	};

function paceInKm(array){

	document.getElementById("horas_pace").value = array[0].h;
	document.getElementById("minutos_pace").value = array[0].m;
	document.getElementById("segundos_pace").value = array[0].s;
	document.getElementById("km-o-mi").innerHTML = "/ km";

};

function paceInMi(array){

	document.getElementById("horas_pace").value = array[0].h;
	document.getElementById("minutos_pace").value = array[0].m;
	document.getElementById("segundos_pace").value = array[0].s;
	document.getElementById("km-o-mi").innerHTML = "/ mi";

};

function markFromPacePerKm(time){

	document.getElementById("horas").value = time.h;
	document.getElementById("minutos").value = time.m;
	document.getElementById("segundos").value = time.s;

};

function markFromPacePerMile(time){

	document.getElementById("horas").value = time.h;
	document.getElementById("minutos").value = time.m;
	document.getElementById("segundos").value = time.s;

};

function table_km(array){

	createTable(array,"km");

};

function table_mi(array){	

	createTable(array,"mi");

};

return {
	init: function(){
		events.subscribe("pace-km", paceInKm);
		events.subscribe("pace-mi", paceInMi);
		events.subscribe("markFromPacePerKm", markFromPacePerKm);
		events.subscribe("markFromPacePerMile", markFromPacePerMile);
		events.subscribe("table-km", table_km);
		events.subscribe("table-mi", table_mi);
	},
	getModo:getModo,
	getDistance:getDistance,
	getTime:getTime,
	getTimePace:getTimePace		
}
})();

