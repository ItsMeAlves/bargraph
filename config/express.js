var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "public");
app.set("PORT", process.env.PORT || 3000);

//configura middlewares

module.exports = app;