var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "resources/views");
app.set("PORT", process.env.PORT || 3000);

app.use(express.static('resources/assets'));

module.exports = app;