import * as express from "express";
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request
import { tasks } from "./routes/tasks";
var totalRequests: number = 0;
var dict: object = {};
class App {
  public app: express.Application;
  public pokeRoutes: tasks = new tasks();

  constructor() {
    this.app = express(); //run the express instance and store in app
    this.config();
    this.pokeRoutes.routes(this.app);
  }

  Logger = (req: express.Request, res: express.Response, next: Function) => {
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

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    this.app.use(this.Logger);
  }
}

export default new App().app;
