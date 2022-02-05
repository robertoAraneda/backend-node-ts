import prisma from '../config/client';
import request from 'supertest';
import Server from '../server/server';
import UserRoute from '../routes/user.route';

beforeAll(async () => {
    // create product categories
    await prisma.user.createMany({
        data: [
            { name: 'Roberto', email: 'roberto@gmail.com', id: 1, password: 'password' },
            { name: 'Claudia', email: 'claudia@gmail.com', id: 2, password: 'password' },
        ],
    });

    console.log('✨ 2 users successfully created!');
});

afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();

    await prisma.$transaction([deleteUsers]);

    await prisma.$disconnect();
});

it('response findAll users', async () => {
    const usersRoute = new UserRoute();

    const app = new Server([usersRoute]);
    const response = await request(app.getServer()).get(`${usersRoute.path}`).expect(200);

    console.dir(response.body);

    return response;
});
