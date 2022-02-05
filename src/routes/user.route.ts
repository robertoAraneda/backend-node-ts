import { Router } from 'express';
import validateParamsMiddleware from '../middlewares/validate.middleware';
import UsersController from '../controllers/user.controller';
import { Routes } from '../interfaces/routes.interface';
import { CreateUserDto } from '../dtos/create-user.dto';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.post(`${this.path}`, validateParamsMiddleware(CreateUserDto), this.usersController.createUser);
  }
}

export default UsersRoute;
