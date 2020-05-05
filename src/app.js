import "dotenv/config";

import mongoose from "mongoose";
import express from "express";
import routes from "./routes";

mongoose.connect(
  `mongodb+srv://kevin:${process.env.MONGOOSE_PASSWORD}@clusterlinkapi-erqjs.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
