const express = require("express");
const router = express.Router();
const connection = require("../connection")

router.get("/", (req, res) => {
    connection.query("SELECT * FROM people", (err,rows,fields)=> {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })

});

module.exports = router;
