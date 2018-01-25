var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app){
    
    // app.get("/user/:id", function(req, res) {
    //     db.User.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //             // include: [{
    //             //     model: db.Post,
    //             //     where: {
    //             //         Userid: req.params.id
    //             //     }
    //             //    }] 
    //     }).then(function(values) {
    //         console.log(values.Posts);
    //         var obj = {
    //             user: values
    //         }
    //         res.render("profile");
    //     });
    // });
    app.get("/user/:id", function(req,res) {
        var param = parseInt(req.params.id);
        db.User.findOne({
            include: [{
              model: db.Post,
              where: {
              Userid: param
           }
          }] 
        }).then(function(results) {
            // console.log("These are the values");
            // console.log(results.dataValues.Posts[0].dataValues);
            var arr = [];
            for (let i = 0; i < results.dataValues.Posts.length; i++) {
                arr.push(results.dataValues.Posts[i].dataValues);
            }
            console.log(arr);
            var obj = {
                user: results.dataValues,
                post: arr
            }
            res.render("profile", obj);
        });
    });

    app.post("/logout", function(req, res) {
        console.log(req.body);
        db.User.update({logged: false}, {
            where: {
                id: req.body.id
            },
        }).then(function(data) {
            console.log(data);
            res.json(data);
        }); 
    });

    app.get("/auth", function(req, res) {
        db.User.findOne({
            where: {
                logged: true
            }
        }).then(function(response) {
            if(response) {
                res.json(response);
            }
        })
    });

    

    app.post("/user/new", function(req, res) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    console.log("wer got and err", err)
                }
                else{
                    console.log("this is a hash", hash)
                    db.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        about: req.body.about,
                        username: req.body.username,
                        password: hash,
                        picture: req.body.picture
                    }).then(function(dbUser) {
                        res.json(dbUser);
                    });
                    
                }
            });
        });

    });

    app.post("/login", function(req, res){
        db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(dbData){
            // Load hash from your password DB.
            console.log(dbData);
            bcrypt.compare(req.body.password, dbData.dataValues.password, function(err, response) {
                // res == true
                // console.log(response);
                if(response){
                    var user = {
                        id: dbData.dataValues.id,
                        name: dbData.dataValues.name,
                        email: dbData.dataValues.email,
                        username: dbData.dataValues.username,
                        picture: dbData.dataValues.picture
                    }
                    db.User.update({logged: true}, {
                    where: {
                        id: user.id
                    },
                }).then(function(data) {
                    console.log("logged In");
                    res.json(user);
                }); 
                }
                else{
                    res.status(404).json("Check your username and password.")
                }
            });
        })
    })
};