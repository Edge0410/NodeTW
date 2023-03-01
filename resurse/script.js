function randomColors() {
    culori = ["red", "blue", "cyan", "indigo", "yellow"];
    index = Math.floor(Math.random() * culori.length);
    title = document.getElementById("titlu");
    title.style.color = culori[index];
}

function basketballAnimation() {
    minge = document.getElementsByClassName('mingeb')[0];
    panou = document.getElementsByClassName('panoub')[0];
    minge.classList.add("minge-clicked");
    panou.classList.add("panou-clicked");
}

function lightTheme() {
    let box = document.getElementsByClassName("container")[0];
    let body = document.getElementsByTagName("body")[0];
    let footer = document.getElementsByTagName("footer")[0];
    if (box != undefined) {
        box.classList.add("light-background");
        box.classList.add("light-color");
    }
    body.classList.add("light-background");
    body.classList.add("light-color");
    footer.classList.add("light-background");
    footer.classList.add("light-color");
}

function darkTheme() {
    let box = document.getElementsByClassName("container")[0];
    let body = document.getElementsByTagName("body")[0];
    let footer = document.getElementsByTagName("footer")[0];
    if (box != undefined) {
        box.classList.remove("light-background");
        box.classList.remove("light-color");
    }
    body.classList.remove("light-background");
    body.classList.remove("light-color");
    footer.classList.remove("light-background");
    footer.classList.remove("light-color");
}

function registerInputCheck() {
    let regemail = /\S+@\S+\.\S+/;
    let email = document.getElementsByName("email")[0].value;
    let varsta = document.getElementsByName("varsta")[0].value;
    let parola = document.getElementsByName("parola")[0].value;
    if (regemail.test(email) && parseInt(varsta) >= 5 && parola.length >= 6) {
        return true;
    }
    else {
        alert("Datele introduse sunt incorecte!");
        return false;
    }
}

var openEvent = false;

window.onload = function () {

    var selector = document.getElementById("selector-tema");
    var radios = selector.querySelectorAll("input");
    var nav = document.getElementsByTagName("nav")[0];
    var header = document.getElementsByTagName("header")[0];

    if (localStorage.getItem("previousTheme") === null) {
        localStorage.setItem("previousTheme", "dark");
        darkTheme();
    }
    else {
        if (localStorage.getItem("previousTheme") == "dark") {
            radios[0].checked = true;
            darkTheme();
        }
        else {
            radios[1].checked = true;
            lightTheme();
        }
    }

    setInterval(randomColors, 2000);

    // pentru navbar

    document.addEventListener("click", function (e) {
        button = document.getElementById("navbutton");
        button.checked = false;
    });

    // cand apasam in afara lui pe telefon se inchide meniul

    nav.addEventListener("click", function (e) {
        e.stopPropagation();
    })

    // cand apasam strict pe imaginea de bg din header sa se intample ceva

    var header = document.getElementsByTagName("header")[0];
    header.onclick = function (e) {
        if (e.target == e.currentTarget) {
            alert("Sursa imaginii: Stadionul Washington DC NCAA - USA");
        }
    }



    document.addEventListener("keypress", function (e) {
        if (e.key === 'B') {
            if (openEvent == false) {
                let element = document.createElement("div");
                element.classList.add("plutitor");
                header = document.createElement("h3");
                text = document.createTextNode("Inscrie-te acum la club si primesti 20% reducere la primele 5 sedinte!");
                header.appendChild(text);
                element.appendChild(header);
                let main = document.getElementsByTagName("main")[0];
                main.appendChild(element);
                openEvent = true;
            }
            else {
                let element = document.getElementsByClassName('plutitor')[0];
                element.remove();
                openEvent = false;
            }
        }
        if (e.key === 'C') {
            let title = document.getElementById("titlu");
            let csstitlu = window.getComputedStyle(title, null);
            alert("Culoarea titlului este " + csstitlu.getPropertyValue("color"));
        }
    });

    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", function () {
            if (this.value == "light") {
                const changelight = setTimeout(lightTheme, 200);
                localStorage.setItem("previousTheme", "light");
            }
            else if (this.value == "dark") {
                const changedark = setTimeout(darkTheme, 200);
                localStorage.setItem("previousTheme", "dark");
            }
        })
    }

    // pentru data din footer

    const data = new Date();
    var headerdata = document.getElementById("data");

    headerdata.innerHTML += data;

}

