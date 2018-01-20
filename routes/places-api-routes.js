// var db = require("../models");

// module.exports = function(app){

// app.get("/api/places", function(req, res){
//     db.Place.findAll({}).then(function(dbPlace){
//         res.json(dbPlace);
//     })
// });

// app.get("/api/places/:id", function(req, res){
//     db.Place.findOne({
//         where: {
//             id: req.params.id
//         },
//     })
// });
   
// app.get("/api/places/:activity", function(req, res){
//     db.Place.findAll({
//         where: {
//             activity: req.params.id
//         },
//     })
// })

// };