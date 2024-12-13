var num_max = 0
var index_gen = 0
var num_estratti = randomGen(90, 91, 1); //genera i numeri estratti


const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function lastFive(){
	var i=0;
	var temp = " ";
	do{
		if(i==0){
			temp+= "<b>"+ num_estratti[index_gen-i] + "</b>&nbsp&nbsp";
		}else{
			temp+= num_estratti[index_gen-i] + "  ";
		}
		i++;
	}while(i<=index_gen && i<5);
	document.getElementById("ultimi5").innerHTML = temp;
}

function randomGen(num, max, min) {

	var arr = [];
	while (arr.length < num) {
		var rn = Math.floor(Math.random() * (max - min)) + min;
		if (arr.indexOf(rn) === -1) arr.push(rn);
	}
	return arr;
}

//Colori delle cartelle
var colori = ["yellow", "#00ff15", "red", "#0051ff"];
var numColori = [];

document.addEventListener('DOMContentLoaded', function setColori() {
	numColori = randomGen(4, 4, 0);
}, false);

//vengono generati i bordi delle tabelle
document.addEventListener('DOMContentLoaded', function setBordiTabellone() {
	for(var i=0; i<9; i++){
		for(var j=0; j<10; j++){
			if((i+1)%3==0 && i!=8 && (i*10+j)!= 24 && (i*10+j)!= 54){
				document.getElementById("cella"+(i*10+j)).style.borderBottomWidth= "thick";
			}else if (j==4 && (i*10+j)!= 24 && (i*10+j)!= 54) {
				document.getElementById("cella"+ (i*10+j) ).style.borderRightWidth= "thick";
			}
		}
	}
}, false);


function crea_tabella() {
	if (num_max < 4) {

		var body = document.getElementsByTagName("body")[0];

		var tbl = document.createElement("table");
		tbl.setAttribute('class', 'tabelle');
		tbl.setAttribute('id', 'tabella' + num_max);


		//Modifico le dimensioni delle tabelle in base al dispositivo
		if (screen.width >= 1300){ //dimensione pc
			if(num_max<2){
				if(num_max==0){
					var str = "0";
				}else{
					var str = "15%";
				}
				tbl.style.marginLeft = "40%";
				
			}else{
				if(num_max==2){
					var str = "0";
				}else{
					var str = "15%";
				}
				tbl.style.marginLeft = "70%";
			}
			tbl.style.marginTop = str;
		}else if(screen.width < 480){ //dimensione mobile
			tbl.style.marginLeft = "auto";
			tbl.style.marginRight = "auto";
			if(num_max == 0){
				var str = "15%";
				tbl.style.marginTop = "50%";
			}else if(num_max==3){
				var str = "50%";
			}else{
				var str = "15%";
			}
			tbl.style.marginBottom = str;
		}else{ //dimensione tablet
			if(num_max<2){
				tbl.style.marginLeft = "6%";
				var str = ((num_max+0.2) * 20) + "%";
			}else{
				tbl.style.marginLeft = "50%";
				var str = (((num_max-2)+0.2) * 20) + "%";
			}
			tbl.style.marginTop = str;
		}

		var tblBody = document.createElement("tbody");

		var matrice = [[], [], [], [], [], [], [], [], []];

		//genera e assegna i numeri
		for (var i = 0, max = 9, min = 1; i < 9; i++ , max += 10, min += 10) {
			if (i == 1) {
				min--;
			} else if (i == 8) {
				max++;
			}
			var tempArr = randomGen(3, max, min).sort();

			for (var k = 0; k < 3; k++) {
				matrice[i][k] = tempArr[k];
			}
		}

		//elimina numeri randomicamente
		for (var i = 0; i < 3; i++) {
			var arr = randomGen(4, 9, 0);
			for (var j = 0; j < 4; j++) {
				var tmp = arr[j];
				matrice[tmp][i] = "";
			}
		}

		// crea celle
		var contatore = 0;
		for (var i = 0; i < 3; i++) {
			// crea riga
			var row = document.createElement("tr");
			for (var j = 0; j < 9; j++) {
				//crea cella
				var cella = document.createElement("th");
				cella.setAttribute('class', 'numeri_tabelle');
				cella.setAttribute('id', 'cella' + contatore + 'tabella' + num_max);
				cella.setAttribute('value', matrice[j][i]);
				var testo = document.createTextNode(matrice[j][i]);
				cella.appendChild(testo);
				row.appendChild(cella);
				//cambia il colore delle celle
				cella.style.borderColor = colori[numColori[num_max]];
				contatore++;
			}
			tblBody.appendChild(row);
		}

		tbl.appendChild(tblBody);
		body.appendChild(tbl);
		

		//cambia il colore delle cartelle
		document.getElementById("tabella" + num_max).style.borderColor = colori[numColori[num_max]];

		num_max++;
		if(num_max==4){
			document.getElementById("creaCart").disabled = true;
		}
	}
}

function trovaValori(tabella, num_uscito) {
	var cella = 0;
	var cont = 0;
	var table = document.getElementById(tabella);
	for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
			if(table.rows[r].cells[c].innerHTML != ""){
				if(table.rows[r].cells[c].innerHTML == num_uscito){
					//alert("numero "+table.rows[r].cells[c].innerHTML+" beccato alla "+(r+1)+"° riga e "+(c+1)+"° colonna");
					if(tabella != "tabellone"){
						cella = document.getElementById("cella"+cont+tabella);
						cella.style.backgroundColor = "Yellow";
						//alert("Colore sostituito al numero: "+table.rows[r].cells[c].innerHTML);
						var contatore=0;
						for(var q=0; q<table.rows[r].cells.length; q++){
							if(table.rows[r].cells[q].style.backgroundColor=="Yellow"){
								alert("numero giallo: "+table.rows[r].cells[q].innerHTML);
								contatore++;
							}
						}
						if(contatore==5){
							alert("Cinquina");
						}
					}else{
						cella = document.getElementById("cella"+cont);
						cella.style.backgroundColor = "Yellow";
					}
					c = m;
					r = n;
				}
			}
			cont++;
		}
  	}
}

function estraiNumeri(){
	if(num_max==0){
		alert("Genera almeno una cartella...");
	}else if(index_gen<90){
		document.getElementById("creaCart").disabled = true;
		trovaValori("tabellone", num_estratti[index_gen]); //controlla il tabellone
		lastFive();
		for(var j=0; j<num_max; j++){ //controlla le tabelle
			var tabella = "tabella" + j;
			trovaValori(tabella, num_estratti[index_gen]);
		}
		index_gen++;
	}
}























/*function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
	alert("Ciao");
}*/


/*
sleep(500).then(() => {
	//do stuff
})*/