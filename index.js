const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const session = require('express-session');

app = express();
app.set("view engine", "ejs"); 

app.use("/resurse", express.static(__dirname+"/resurse"));
app.use(express.urlencoded({extended:true})); // creeaza req.body pentru formular ca sa nu mai fie in url parametrii din post

app.use(session({ secret: 'abcdefg', resave: true, saveUninitialized: false})); // req.session

app.get(["/", "/index"], function(req, res){
    res.render("pages/index", {utilizator:req.session.utilizator});
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.render("pages/logout");
})

app.get("/*", function(req, res){
    res.render("pages"+req.url, {utilizator:req.session.utilizator}, function(err, rezrand){
        if(err){
            res.render("pages/error404", {utilizator:req.session.utilizator}); 
        }
        else
        {
            res.send(rezrand);
        }
    });
});


caleJson = __dirname+"/resurse/json/users.json";
app.post("/register", function(req, res){
    console.log(req.body);
    let useri;
    if(!fs.existsSync(caleJson))
    {
        useri = {useri:[]};
    }
    else
    {
        useri=JSON.parse(fs.readFileSync(caleJson).toString("utf8"));
    }
    req.body.parola = crypto.scryptSync(req.body.parola, "parola criptare", 32).toString('hex');
    useri.useri.push(req.body);
    console.log("useri", useri);
    fs.writeFileSync(caleJson, JSON.stringify(useri));
    res.render("pages/register",{raspuns:"ok", utilizator:req.session.utilizator});
})

app.post("/login", function(req, res){
    console.log(req.body);
    let useri;
    let foundUser = 0;
    if(!fs.existsSync(caleJson))
    {
        useri = {useri:[]};
    }
    else
    {
        useri=JSON.parse(fs.readFileSync(caleJson).toString("utf8"));
    }
    req.body.parola = crypto.scryptSync(req.body.parola, "parola criptare", 32).toString('hex');
    for(let user of useri.useri)
    {
        if(user.email == req.body.email && user.parola == req.body.parola)
        {
            req.session.utilizator = user;
            req.session.found = 1;
            res.redirect("/index");
            foundUser = 1;
            break;
        }
    }
    if(foundUser == 0)
        res.render("pages/login", {found: -1});
})

app.listen(8888); // port pe care dam listen
console.log("Running...");

