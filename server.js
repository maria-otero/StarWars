// CONNECTION TO MY HTML!!

// Dependencies
// ===========================================================
var express = require("express");
// npm body-parser: Formatea todas las req and res in a way that is VERY EASY to manipulate.
var bodyParser = require('body-parser');
// Allows to deliver HTML pages to user easyly with out express.
var path = require("path");

var app = express();
var PORT = 3000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))


// Data
// ===========================================================
var characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kwnobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }
];


// Routes
// ===========================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/:characters?", function(req, res) {
  
  var chosen = req.params.characters;

  // Chosen = true, osea if chosen es creado...
  if (chosen) {
    console.log(chosen);
    for(var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].name) {
        res.json(characters[i]);
        return;
      }
    }

    res.send("No character found!");
  } else {
    res.json(characters);
  }

});






// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});
