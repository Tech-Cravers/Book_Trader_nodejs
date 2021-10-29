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
const PORT = 5000|| process.env.PORT;
app.listen(PORT, () => console.log(`Hey Im running on port ${PORT}`));
