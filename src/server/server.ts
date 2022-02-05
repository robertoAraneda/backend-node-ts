import express, { Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Routes } from '../interfaces/routes.interface';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';

class Server {
  public application: Application;

  public port: number | string;

  constructor(routes: Routes[]) {
    this.application = express();
    this.port = process.env.PORT || 3000;
    this.init();
    this.routes(routes);
  }

  public getServer() {
    return this.application;
  }

  private init() {
    dotenv.config();

    this.application.use(morgan('dev'));
    this.application.use(cors({ origin: '*', credentials: true }));
    this.application.use(helmet());
    this.application.use(hpp());
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private routes(routes: Routes[]) {
    routes.forEach((route) => {
      this.application.use('/', route.router);
    });
  }

  public run() {
    const showRun = () => console.log(`Server run on port ${this.port}`);
    this.application.listen(this.port, showRun);
  }
}

export default Server;
