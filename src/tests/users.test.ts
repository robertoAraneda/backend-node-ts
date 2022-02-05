import bcrypt from 'bcrypt';
import request from 'supertest';
import Server from '../server/server';
import UserRoute from '../routes/user.route';

afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('[GET] /users', () => {
    it('response findAll users', async () => {
        const usersRoute = new UserRoute();

        const app = new Server([usersRoute]);
        const response = await request(app.getServer()).get(`${usersRoute.path}`).expect(200);

        console.dir(response.body);

        return response;
    });
});
