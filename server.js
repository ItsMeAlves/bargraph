var app = require("./config/express");
var routes = require("./routes")(app);

app.listen(app.get("PORT"), function(){
    console.log("listening " + app.get("PORT"));
});