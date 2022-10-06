var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userSK:DatabasePass19@cluster0.hhjwnou.mongodb.net/ASDatabase?retryWrites=true&w=majority");
// mongodb+srv://adityagawali:adityagawali@cluster0.qhmboym.mongodb.net/ASDatabase?retryWrites=true&w=majority

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

var schemaPage2 = new mongoose.Schema({
    data: Number,
    month: String
})

var detailsModel = mongoose.model("as",schema);
var page2DetailsModel = mongoose.model("as_details",schemaPage2);


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

    page2DetailsModel.find({},{_id:0}, function(err,allData){
        // {_id:0, "data":1}
        if(err)
        {
            console.log(err);
        }
        else
        {
            var month = allData.map(function(item) {
                return item.month;
              });
            console.log(month);

            var data = allData.map(function(item) {
                return item.data;
              });
              
            console.log(JSON.stringify(data));

            res.render("pages/detailNumber",{
                    // details: allDetails, month: asNumber.month, date: asNumber.date
                    month:JSON.stringify(month), data:JSON.stringify(data), number: asNumber.number, allData: allData   
                })
        }
     });


  });

app.listen(8080)

