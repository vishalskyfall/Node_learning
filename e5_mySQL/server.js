const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const peopleRoutes= require("./routes/people")
const connection = require("./connection")

var app = express();
app.use(bodyparser.json());
app.use("/people". peopleRoutes)


 

app.listen(3000);
