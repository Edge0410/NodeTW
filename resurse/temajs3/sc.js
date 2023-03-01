window.onload = function(){
    document.getElementById("concat1").onclick = function(){
        lista1 = document.getElementById("lista1");
        lista2 = document.getElementById("lista2");
        lista1.innerHTML += lista2.innerHTML;
        lista2.remove();
    };

    document.getElementById("concat2").onclick = function(){
        lista1 = document.getElementById("lista1");
        lista2 = document.getElementById("lista2");
        while(lista2.children.length)
        {
            lista1.appendChild(lista2.children[0]);
        }
    };
};