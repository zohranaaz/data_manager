import express from 'express';
import Route from './routes/routes';
import { json, urlencoded } from 'body-parser';
import { Database } from "./db/config";
import multer from "multer";
import dotenv from 'dotenv';
import config from './config';
dotenv.config();

const port = config.port;
const upload = multer();

export class App {

  private app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(json());
    this.app.use(upload.any());
    this.app.use(urlencoded({ extended: true }));
    this.app.use("/user", Route);

    this.app.use((
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(500).json({ message: err.message });
    });
  }

  mountDb() {
    try {
      let db: Database;
      db = new Database();
    } catch (error) {
      console.log("Error while initializing Db tables ", error);
    }
  }

  init() {
    this.app.listen(port, () => {
      return console.log('The application is running on port', port);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });
    this.mountDb();
  }
}