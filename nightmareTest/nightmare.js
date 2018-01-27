//import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

var Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
var expect = require("chai").expect;


nightmare
    .goto("https://glacial-river-83546.herokuapp.com/")
    .click("#loginModal")
    .type("#login-name", "bigburgerbob1234")
    .type("#login-password", "password")
    .click("#login")
    .click("#profile")
    .end()
    .catch(function(err){
        console.error("Failed", err);
    })         


