const express = require('express')

app = express()
app.set('view engine', 'ejs');
app.use(express.static("stylings"))

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function (req,res) {
    const baseurl = "https://pokeapi.glitch.me/v1/pokemon/"
    const id = Math.floor(Math.random() * 100) + 1
    const url = baseurl + id
    fetch(url).then((response)=>response.json())
    .then((data)=>{
        pokename = data[0].name
        type = data[0].types[0]
        imgScr = data[0].sprite
        height = data[0].height
        weight = data[0].weight
        description = data[0].description
        res.render("updated",{
            pokemonImage : imgScr + "/",
            pokemonName : pokename,
            pokemonType : type,
            pokemonHeight : height,
            pokemonWeight : weight,
            pokemonDescription : description,
        })
    })
    .catch(()=>{
        res.sendFile(__dirname + "/failure.html")
    })
})

app.post("/failure",function (req,res) {
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Server Initiated");
})

//wanted to edit colour theme as well