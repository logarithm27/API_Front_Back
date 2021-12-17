const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./schemas/users")
const bodyParser = require("body-parser")
const categoryModel = require("./schemas/categories")

const db = mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true})


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<h1>Bienvenue</h1>")
})

app.get("/page", function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue sur la page d'accueil</h1>`)
})

app.get("/page/:numPage", function(req,res){
    const {numPage} = req.params
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(`<h1>Bienvenue Nodemon npm start sur la page numero : ${numPage}</h1>`)
})

app.get("/user/:id", function(req,res){
    const {id} = req.params
    
    if(isNaN(parseInt(id))){
        res.writeHead(400, {"Content-Type": "text/html"})
        res.end("Wrong id format")
        return null
    }
    let selectUser = users.filter(user=>(user.id === parseInt(id)))
    
    if(selectUser.length === 0){
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("No user found")
        return null
    }
        
    res.status(200).json(selectUser[0])
})

app.get("/user", async function(req,res){
    
    res.status(200).json({id:datas["_id"]})
})

app.post("/user", async function(req,res){
    const {nom, prenom, age, category} = req.body
    console.log(req.body)
    const datas = await userModel.create({
        nom,
        prenom,
        age,
        category
    })
    res.status(201).json({id:datas["_id"]})
})

app.put("/user/:id", async function(req,res){
   // La modification d'un utilisateur
})

app.delete("/user/:id", async function(req,res){
   // La suppression
})

app.get("/category", function(req,res){
    categoryModel.find({}, function(err, categories){
        console.log(err, categories)
        res.status(200).json(categories)
    })
})

module.exports = app
