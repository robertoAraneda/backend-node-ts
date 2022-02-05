import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import UserService from '../services/user.service';

class UsersController {
    public userService = new UserService();

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser();

            res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
