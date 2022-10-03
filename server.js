var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://adityagawali:adityagawali@cluster0.qhmboym.mongodb.net/ASDatabase?retryWrites=true&w=majority");


const ejs = require("ejs");
//const { default: mongoose } = require("mongoose");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

var schema = new mongoose.Schema({
    rank: Number,
    number: Number,
    organization: String,
    country: String
})

var detailsModel = mongoose.model("as",schema);

app.get("/",function(req,res)
{
 detailsModel.find({}, function(err,allDetails){
    if(err)
    {
        console.log(err);

    }
    else
    {
        res.render("pages/index",{details: allDetails})
    }
 })
});

app.get('/:number', function(req, res){

    var asNumber = req.params;
    console.log(asNumber.number);
    res.render("pages/detailNumber",{
        number: asNumber.number

    });

  });

app.listen(8080)

