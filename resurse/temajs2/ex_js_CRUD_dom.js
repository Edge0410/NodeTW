function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());
}

var contor = 0;
var vPrenume=["Costica", "Gigel", "Dorel", "Maricica", "Dorica", "Gigileana", "Crinisoara", "Zoe", "Gogu", "Bob"];
var vPrefixeNume=["Bubul", "Bondar", "Dudul", "Gogul", "Zumzul"];
var vSufixeNume=["ache", "escu", "esteanu","eanu", "eschi"];
var grupe=["A", "B", "C", "D"];
var randinit = null;
var randfin = null;


function noteRandom(){
	var nrNote=randInt(1,5);
	var note=[];
	for(let i=0;i<nrNote;i++)
	{ 
		note.push(randInt(1,11));
	}
	return note;
}


function elevRandom(){
	return{
		prenume: vPrenume[randInt(0, vPrenume.length)],
		nume: vPrefixeNume[randInt(0, vPrefixeNume.length)]+vSufixeNume[randInt(0, vSufixeNume.length)],
		grupa: grupe[randInt(0, grupe.length)],
		note: noteRandom()
	};
}
function genereazaElevi(n){
	var elevi=[];
	for(let i=0;i<n;i++){
		elevi.push(elevRandom());
	}
	console.log(elevi);
	return elevi;
}

function clickrand(e){
	//TO DO corectati
	if(e.ctrlKey){
		this.remove();
		contor += 1;
		afislog("Elev sters");
	}
	else if(e.altKey)
	{
		if(!randinit)
		{
			randinit = this;
			randinit.classList.add("select-interval");
		}
		else
		{
			randfin = this;
			randinit.classList.remove("select-interval");
			var tabel = document.getElementById("tab");
			var tbody = tabel.getElementsByTagName("tbody")[0];
			var v_randuri = Array.from(tbody.children);
			var indinit = v_randuri.indexOf(randinit);
			var indfin = v_randuri.indexOf(randfin);
			var parcurgere = randinit;
			var frate;
			if(indinit < indfin)
			{
				frate = "nextElementSibling";
			}
			else
			{
				frate = "previousElementSibling";
			}
			while(parcurgere!=randfin){
				parcurgere.classList.add("selectat");
				parcurgere = parcurgere[frate];
			}
			randfin.classList.add("selectat");
		}
	}
	else{
		this.classList.toggle("selectat");
		contor += 1;
		afislog("Elev selectat/deselectat");
	}
}

function creeazaRand(tipCelula, vector){
	tr=document.createElement('tr'); //TO DO sa se creeze un rand
	tr.classList.add(vector[2]);//clasa sa fie egala cu grupa elevului
	tr.onclick=clickrand;
	for(let x of vector){
		var celula=document.createElement(tipCelula);
		celula.innerHTML = x; //TO DO continutul celulei trebuie sa fie valuarea din vector
		tr.appendChild(celula);// TO DO adaugati celula in rand
	}
	return tr;
}

function creeazaTabel(elevi){
	if(!elevi || elevi.length==0) return;
	
	var tabel=document.createElement("table");
	tabel.id="tab";
	var thead=document.createElement("thead");// TO DO - creare thead
	tabel.appendChild(thead); // TO DO - adugare thead in tabel
	var rand=creeazaRand("th",Object.keys(elevi[0]));
	console.log("Proprietati:");console.log(Object.keys(elevi[0]));
	thead.appendChild(rand);
		
	
	var tbody=document.createElement("tbody");
	tabel.appendChild(tbody);
	for(let elev of elevi){ //TO DO vrem ca variabila elev sa aiba pe rand ca valoare fiecare element din elevi
		rand=creeazaRand("td",Object.values(elev));
		console.log("Valori:");console.log(Object.values(elev));
		tbody.appendChild(rand);

	}
	return tabel;
}

function afislog(sirinfo)
{
	var info = document.getElementById("info");
	var pr = document.createElement("p");
	pr.title = contor;
	pr.innerHTML = "[" + (new Date()) + "]" + sirinfo;
	info.appendChild(pr);
}

function deselecteaza()
{
	var selectate = document.getElementsByClassName("selectat");
	while(selectate.length != 0)
	{
		selectate[0].classList.remove("selectat");
	}
}

window.onload=function(){
	var v_elevi=genereazaElevi(10);
	document.getElementById("container_tabel").appendChild(creeazaTabel(v_elevi));
	document.getElementById("add_sfarsit").onclick = function()
	{
		var tabel = document.getElementById("tab");
		var tbody = tabel.getElementsByTagName("tbody")[0];
		var elevnou = elevRandom();
		var rand  = creeazaRand("td", Object.values(elevnou));
		tbody.appendChild(rand);
		afislog("Am adaugat elev");
	};
	document.getElementById("add_inceput").onclick = function()
	{
		var tabel = document.getElementById("tab");
		var tbody = tabel.getElementsByTagName("tbody")[0];
		var elevnou = elevRandom();
		var rand  = creeazaRand("td", Object.values(elevnou));
		var primalinie = tabel.rows[1];
		tbody.insertBefore(rand, primalinie);
		afislog("Am adaugat elev");
	};
	document.getElementById("inverseaza_coloane").onclick = function(){
		var tabel = document.getElementById("tab");
		var randuri = tabel.getElementsByTagName("tr");
		for(let rand of randuri)
		{
			rand.insertBefore(rand.children[1], rand.children[0]);
		}
	};
	
	document.getElementById("deselectare").onclick = deselecteaza;
	document.getElementById("dezactivare").onclick = function(){
		this.classList.toggle("apasat");
		if(this.classList.contains("apasat"))
		{
			//vreau sa selectez toate randurile din tbodyuk tabelului cu idul tab
			var tabel = document.getElementById("tab");
			var tbody = tabel.getElementsByTagName("tbody")[0];
			var randuri = tbody.getElementsByTagName("tr");
			var randuri = document.querySelectorAll("#tab tbody tr");

			if(this.classList.contains("apasat"))
			{
				for(let r of randuri)
				r.onclick = function(){
					alert("Actiuni deselectate");
				};
			}
			else
			{
				for(let r of randuri)
				r.onclick = randclick;
			}
		}
	};
	document.getElementById("sterge").onclick = function(){
		var clasa = prompt("Introduceti un nume de clasa");
		if(!grupe.includes(clasa))
			alert("ClASA INCORECTA");
		else
		{
			deselecteaza();
			var elevi = document.getElementsByClassName(clasa);
			for(let elev of elevi)
			{
				elev.classList.add("selectat");
			}
			var raspuns = confirm("Sigur doriti sa stergeti acesti elevi din clasa ?");
			if(raspuns)
			{
				var nrel = elevi.length;
				while(elevi.length != 0)
				{
					elevi[0].remove();
				}
				alert(nrel);
			}
		}
	};

	document.getElementById("sorteaza_nume").onclick = function(){
		var randuri = Array.from(document.querySelectorAll("#tab tbody tr"));
		randuri.sort(function(a,b){
			let nume_a = a.children[1].innerHTML;
			let nume_b = b.children[1].innerHTML;
			return nume_a.localeCompare(nume_b);
		}); // a si b sunt taguri tr
		for(let r of randuri)
		{
			r.parentNode.appendChild(r);
		}
	};
}