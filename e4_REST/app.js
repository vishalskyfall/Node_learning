const express = require("express");
const App = express();
const bodyparser = require("body-parser");
const { json } = require("body-parser");
//

App.use(bodyparser.urlencoded({ extended: false }));
App.use(bodyparser.json());
let people = {
  people: [{ name: "Vishal" }],
};

App.get("/people", function (req, res) {
  //you can add your DB connections as well.
  res.json(people);
  res.end();
});
App.post("/people", function (req, res) {
  //you can add your DB connections as well.
  if (req.body && req.body.name) {
    people.people.push({ name: req.body.name }); // pushing new value via post
  }

  res.json(people);
  res.end();
});

App.get("/people/:name/:age", function (req, res) {
  res.json({ name: req.params.name, age: req.params.age });
  req.end();
});

App.listen(3000);
