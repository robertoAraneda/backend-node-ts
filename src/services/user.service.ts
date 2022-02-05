import { User } from '@prisma/client';
import { Context } from 'config/context';

import prisma from '../config/client';

class UserService {
    public users = prisma.user;

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findMany();
        return allUser;
    }

    public async createUser_(user: any, ctx: Context): Promise<User> {
        const createdUser: User = await ctx.prisma.user.create({ data: user });

        return createdUser;
    }

    public async createUser(user: any): Promise<User> {
        const createdUser: User = await this.users.create({ data: user });

        return createdUser;
    }
}

export default UserService;
