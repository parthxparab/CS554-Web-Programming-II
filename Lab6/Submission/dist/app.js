"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser"); //used to parse the form data that you pass in the request
const tasks_1 = require("./routes/tasks");
var totalRequests = 0;
var dict = {};
class App {
    constructor() {
        this.pokeRoutes = new tasks_1.tasks();
        this.Logger = (req, res, next) => {
            //middleware here
            totalRequests++;
            console.log("###################################################");
            console.log("URL PATH: ", req.originalUrl);
            console.log("HTTP METHOD/VERB: ", req.method);
            console.log("No. of times URL requested: ", totalRequests);
            console.log("Request Body: ", req.body);
            console.log("###################################################");
            next();
        };
        this.app = express(); //run the express instance and store in app
        this.config();
        this.pokeRoutes.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(this.Logger);
    }
}
exports.default = new App().app;
