var CalculatorHistoryView = (function(){

	function dosDigits(value){
		return value <10 ? "0" + value : value;
	}

	function renderValues(array){

		document.getElementById("historial").innerHTML = "";//limpiar div del historial si ya hay datos mostrados, para que no se acumulen

		var miTabla = document.createElement("table");
		miTabla.setAttribute("class", "table table-sm");

		var th1 = document.createElement("th");
		var th2 = document.createElement("th");
		var th3 = document.createElement("th");
		var th4 = document.createElement("th");
		var th5 = document.createElement("th");
		var th6 = document.createElement("th");

		th1.innerHTML = "#";
		th2.innerHTML = "Tipo";
		th3.innerHTML = "Unidades";
		th4.innerHTML = "Distancia";
		th5.innerHTML = "Marca";
		th6.innerHTML = "Ritmo";

		miTabla.appendChild(th1);
		miTabla.appendChild(th2);
		miTabla.appendChild(th3);
		miTabla.appendChild(th4);
		miTabla.appendChild(th5);
		miTabla.appendChild(th6);

		for(var i = 0; i < array.length; i++){

			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.innerHTML = i;
			var td2 = document.createElement("td");
			td2.innerHTML = array[i].type;
			var td3 = document.createElement("td");
			td3.innerHTML = array[i].units;
			var td4 = document.createElement("td");
			td4.innerHTML = array[i].distance;
			var td5 = document.createElement("td");
			td5.innerHTML = dosDigits(array[i].mark.horas)+":"+dosDigits(array[i].mark.minutos)+":"+dosDigits(array[i].mark.segundos);
			var td6 = document.createElement("td");
			td6.innerHTML = dosDigits(array[i].pace.horas)+":"+dosDigits(array[i].pace.minutos)+":"+dosDigits(array[i].pace.segundos);

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);

			miTabla.appendChild(tr);

		}

		document.getElementById("historial").appendChild(miTabla);

	}


	return{
		init: function(){
			events.subscribe("mostrarHistorial", renderValues);
		}
	}

})();