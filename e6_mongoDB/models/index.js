const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/test_node",{useNewUrlParser:true},(err)=>{

if(!err){
    console.log("Success, connected to DB now");
}
else{
    console.log("Error in DB");
}
});

const course = require("./courses.model");
 //connection string . .