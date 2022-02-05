/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import UserService from '../services/user.service';

class UsersController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200);
      res.json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      res.status(500);
      res.json({ message: error });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createdUser: User = await this.userService.createUser(req.body);

      res.status(201);
      res.json({ data: createdUser, message: 'createUser' });
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409);
        res.json({ message: 'There is a unique constraint violation, a new user cannot be created with this email' });
      }

      res.status(500);
      res.json({ message: error });
    }
  };
}

export default UsersController;
