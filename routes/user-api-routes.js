var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app){

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
                    //console.log(req.body);
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
                console.log(response);
                if(response){
                    var user = {
                        id: dbData.dataValues.id,
                        name: dbData.dataValues.name,
                        email: dbData.dataValues.email,
                        username: dbData.dataValues.username,
                        picture: dbData.dataValues.picture
                    }
                    res.json(user);
                }
                else{
                    res.status(404).json("Check your username and password.")
                }
            });
        })
    })
};