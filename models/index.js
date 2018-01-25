'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

var config = {
  "username": "sou66amol104lhwd",
  "password": "uiucwj0m7whg31qj",
  "database": "ivzjw729o9fs16y0"
  "host": "alv4v3hlsipxnujn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  "port": 3306
  "dialect": "mysql"
};

if (process.env.JAWSDB_URL) {
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;