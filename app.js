console.log("Running app.js");

//module imports
var routes = require("./routes");

const express = require('express');
const app = express();

//app.set('views', '../views')
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));

//ROUTES
app.use(routes);

//starting the server
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Hey Im running on port ${PORT}`));
