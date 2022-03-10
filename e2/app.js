var express = require("express");
var path = require("path");
var http = require("http");
var routes = require("./routes");
var urlencoded = require("url");
var bodyParser = require("body-parser");
var logger = require("logger");
var methodOverride = require("method-override");
var json = require("json");

var nano = require("nano")("http://localhost:5984");

var db = nano.use("address");
var app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index);

app.post("createdb", function (request, response) {
  nano.db.create(request.body.dbname, function (err) {
    if (err) {
      response.send("Error creating database : " + request.body.dbname);
      return;
    }

    response.send("Database " + request.body.dbname + " created Successfully");
  });
});

app.post("/new_contact", function (request, response) {
  var name = request.body.name;
  var phone = request.body.phone;
  db.insert(
    { name: name, phone: phone, crazy: true },
    phone,
    function (err, body, header) {
      if (err) {
        response.send("Error creating contact : ");
        return;
      }
      response.send("contact has been created Successfully . . .");
    }
  );
});

app.post("/view_contact", function (request, response) {
  var alldoc = "Following are the contacts";
  db.get(request.body.phone, { revs_info: true }, function (err, body) {
    if (!err) {
      console.log(body);
    }

    if (body) {
      allcod += "Name: " + body.name + "<br />Phone Number : " + body.phone;
    } else {
      alldoc = "No record found.";
    }
    response.send(alldoc);
  });
});

app.post("/delete_contact", function (req, res) {
  db.get(req.body.phone, { revs_info: true }, function (err, body) {
    if (!err) {
      db.destroy(req.body.phone, body._rev, function (err, body) {
        if (err) {
          res.send("Error deleting contact!");
        }

        res.send("Contacts  deleted successfully . . .");
      });
    }
  });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express Server Listening on Port " + app.get("port"));
});
