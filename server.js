var express = require("express");

var bodyparser = require("body-parser");

const {connectToDb, getDb} = require('./db')

//var mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://userSK:DatabasePass19@cluster0.hhjwnou.mongodb.net/IndexOverview?retryWrites=true&w=majority");

const ejs = require("ejs");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

let db
connectToDb((err) => {
    if(!err)
    {
        app.listen(8080)
        db = getDb()
    }
})

// var ASOverviewSchema = new db.Schema({
//     asn: String,
//     org_name: String,
//     rank: String,
//     total: String,
//     filter: String,
//     remove: String,
//     ratio: String

// })

// var schemaPage2 = new mongoose.Schema({
//     data: Number,
//     month: String
// })

//var detailsModel = mongoose.model("asindexoverviews",ASOverviewSchema);
//var page2DetailsModel = mongoose.model("as_details",schemaPage2);



app.get("/",function(req,res)
{

    //let page = req.query.p ? Number(req.query.p) : 1;



    let entry = []
    let entryPerPage = []
    let asPerPage = 20
    db.collection('asindexoverviews')
    .find()
    // .skip(page * asPerPage)
    // .limit(asPerPage)
    .forEach(as =>entry.push(as))
    .then(() => {
        
        const numOfResults = entry.length;
        const numberOfPages = Math.ceil(numOfResults / asPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if(page > numberOfPages){
            res.redirect('/?page='+encodeURIComponent(numberOfPages));
        }else if(page < 1){
            res.redirect('/?page='+encodeURIComponent('1'));
        }
        const startingLimit = (page - 1) * asPerPage;

        db.collection('asindexoverviews')
        .find()
        .skip(startingLimit * asPerPage)
        .limit(asPerPage)
        .forEach(as =>entryPerPage.push(as))
        .then(() => {

            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
            if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
            }
    
            res.render("pages/index",{details: entryPerPage, page, iterator, endingLink, numberOfPages});
        })
    })



});

// // app.get('/AS:number', function(req, res){

// //     var asNumber = req.params;
// //     //console.log(asNumber.number);

// //     page2DetailsModel.find({},{_id:0}, function(err,allData){
// //         // {_id:0, "data":1}
// //         if(err)
// //         {
// //             console.log(err);
// //         }
// //         else
// //         {
// //             var month = allData.map(function(item) {
// //                 return item.month;
// //               });
// //             //console.log(month);

// //             var data = allData.map(function(item) {
// //                 return item.data;
// //               });
              
// //             //console.log(JSON.stringify(data));

// //             res.render("pages/detailNumber",{
// //                     // details: allDetails, month: asNumber.month, date: asNumber.date
// //                     month:JSON.stringify(month), data:JSON.stringify(data), number: asNumber.number, allData: allData   
// //                 })
// //         }
// //      });


//   });

  app.get('/about', function(req, res)
  {
    res.render("pages/about");
});




