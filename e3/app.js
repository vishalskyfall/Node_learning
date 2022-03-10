var express = require('express');
var http= require('http');
var fs = require('fs');

var app = express();
var server = http.createServer(app);//server with all features of express-app

app.get('/',function(req,res){
    res.send("<h1>Express works!!</h1>");
})
app.get('/tasks',function(req,res){
    // res.send("<h1>Task are working !!</h1>");
    fs.readFile('./db.json', function(err,data){
        if(!err){
            var tasks = JSON.parse(data.toString()).tasks;
            res.json(tasks+"<h2>Json is displaying  . . .</h2>")
        }
    })

})

server.listen(3000,function(){
    console.log("server is listening on 3000");
})