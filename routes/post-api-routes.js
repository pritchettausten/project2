var db = require("../models");

module.exports = function(app){

    app.get("/", function(req, res){

        //res.render("index");
        db.Post.findAll({}).then(function(dbPost){
            var obj = {
                post: dbPost
            };
            // var arr = [];
        
            // for (var i = 0; i < obj.post.length; i++) {
            //     console.log(obj.post[i].dataValues);
            //     var coord = obj.post[i].dataValues;
            //     arr.push(coord);
            //     console.log(coord);
            //     console.log(obj.post[i].locationName);
            //     console.log(obj.post[i].lat);
            //     console.log(obj.post[i].lng);
            //     console.log("----------------------") 
            // }
            //console.log(arr);
            res.render("index", obj);

        });
    });

    app.get("/coord", function(req, res){
        db.Post.findAll({
        }).then(function(dbPost){
            // var obj = {
            //     post: dbPost,
            // };
            // var arr = [];
            // for (var i = 0; i < obj.post.length; i++) {
            //     var coord = obj.post[i].dataValues;
            //     console.log(coord.lat);
            //     console.log(coord.lng);
            //     var a = {
            //         lat: coord.lat,
            //         lng: coord.lng
            //     }
            //     arr.push(a);
            // }
            // console.log(arr);
            res.json(dbPost);
        });
    });

    app.get("/:activity", function(req, res){
        console.log(req.params.activity);
        db.Post.findAll({
            where: {
                activity: req.params.activity
                //include: [db.User]
            }
        }).then(function(dbPost){
            console.log(dbPost);
            var obj = {
                post: dbPost
            };
            res.render("index", obj);
        })
    });

    app.get("/filter", function(req, res){
        db.Post.findAll({
            where: {
                activity: Skiing
            }
        }).then(function(dbPost){
            res.json(dbPost);
        });
    })

    // app.get("/logged", function(req, res){
    //     db.Post.findAll({
    //     }).then(function(dbPost){
    //         var obj = {
    //             post: dbPost
    //         };
    //         res.render("logged", obj);
    //     });
    // });

    app.post("/api/posts", function(req, res){
        db.Post.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    })

    app.all('*', function(req, res) {
        res.redirect("/");
      });
};