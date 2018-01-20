var db = require("../models");

module.exports = function(app){

    app.get("/", function(req, res){
        res.render("index");
        // db.Post.findAll({
        //     where: {
        //         activity: ,
        //         include: [db.User]
        //     }
        // }).then(function(dbPost){
        //     var obj = {
        //         post: dbPost
        //     };
        //     res.render("index", obj);
        // });
    });

    app.get("/api/posts/:activity", function(req, res){
        db.Post.findAll({
            where: {
                activity: req.params.activity,
                include: [db.User]
            }

        }).then(function(dbPost){
            var obj = {
                post: dbPost
            };
            res.render("index", obj);
        })
    });

    app.post("/api/posts", function(req, res){
        db.Post.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    })
};