window.onload=function(){

	document.getElementById("albastreste").onclick = albastreste //TO DO

}

function albastreste(){
	pgfs=document.querySelectorAll("p");
	//de observat si apoi de comentat
	alert(pgfs[0].style.color)
	pgfs[0].style.color="blue"
	alert(pgfs[0].style.color)
}