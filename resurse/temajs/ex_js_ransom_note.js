function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());
}




class Culoare{
	constructor(_r = 0, _g = 0, _b = 0){// TO DO definiti trei parametri _r, _g, _b cu valori implicite 0
		this.r= _r;
		this.g = _g;
		this.b = _b; //TO DO completati pentru g si b
	}
	generateRandom(){
		this.r = randInt(0,255)
		this.g = randInt(0,255)
		this.b = randInt(0,255) //TO DO generati o culoare aleatoare folosind functia randInt definita mai sus
	}
	
	toString(){
		return "rgb("+this.r+","+this.g+","+this.b+")";
	}
	invert(){
		return new Culoare(255 - this.r, 255 - this.g, 255 - this.b);//TO DO calculati culoarea complementara
	}
};

function ransom(sir)
{
	//TO DO setati culoarea de background a body-ului la gri
	var bb = document.getElementsByTagName("body")[0];
	bb.style.backgroundColor = "gray";
	var scrisorica=document.getElementById("scrisorica");//selectati elementul cu id-ul "scrisorica"
	scrisorica.style.backgroundImage="url('hartie_veche.png')"; //setati imaginea de background ceruta in enunt
	for (let i=0;i<sir.length;i++) //TO DO parcurgere sir
		{

			var patt1=/\s/g;

			if(!sir[i].match(patt1))
			{
				lit=document.createElement("span");
				scrisorica.appendChild(lit);
				lit.innerHTML=sir[i] //litera i
				c=new Culoare();
				c.generateRandom();
				lit.style.color=c.toString();
				lit.style.background=c.invert().toString();
				lit.style.fontSize=randInt(20,31)+"px";
				nr=randInt(0,2);
				lit.style.fontWeight=(nr%2==0?"bold":"normal")
				nr=randInt(0,2);
				lit.style.fontStyle=(nr%2==0?"italic":"normal") // TO DO - setare random  daca sa fie font italic sau nu (ca si la bold)
				fonturi=["Times New Roman","Comic Sans MS","Impact","Arial Black","Courier New","Lucida Console","Trebuchet MS"];
				lit.style.fontFamily=fonturi[randInt(0, fonturi.length)] //TO DO element aleator din fonturi
				lit.onclick= function(){
					console.log(this.style.color + " " +this.style.backgroundColor);
					// TO DO afisati in consola culoarea elementului (atat de text cat si de background)
				}
			}
			else
			{
				scrisorica.appendChild(document.createTextNode(" ")); // pentru spatii nu mai facem span
			}
		}
}

