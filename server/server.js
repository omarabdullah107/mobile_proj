const express = require('express');
const app  = express();
const recipes = require('./recipes.json');


app.get('/recipes', function (req, res) {
  return res.send(recipes);
});


app.get('/recipes/:recipe', function(req, res) {
  const { recipe } = req.params;
  return res.send(recipes[recipe.toUpperCase()]);
});

// posting into the comments array



//posting into the rating array (optional if we gonna use the rating array)

app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://localhost:3000");
});