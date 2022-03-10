const connection = require("./models");
const express = require("express");
const application = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyParseer = require("body-parser");
const coursecontroller = require("./controllers/courses")

application.use(
  bodyParseer.urlencoded({
    extended: true,
  })
);



application.set("views", path.join(__dirname, "/views/"));
application.engine(
  "hbs",
  expressHandlebars.engine({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts",
  })
);



application.set("view engine", "hbs");
application.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
res.render("index",{ })
});
application.use("/course",coursecontroller)



application.listen(3000, () => {
  console.log("Server started");
});
