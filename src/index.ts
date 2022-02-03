import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

*/
app.get('/', (req: Request, res: Response): void => {
    res.send('Hello Typescript with Node.js!');
});

app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: false },
        include: { author: true },
    });
    res.json(posts);
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        include: { posts: true },
    });
    res.json(users);
});

async function main() {
    // ... you will write your Prisma Client queries here
    await prisma.user.create({
        data: {
            name: 'Roberto',
            email: 'roberto@prisma.io',
            posts: {
                create: { title: 'Hello World' },
            },
        },
    });

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.dir(allUsers, { depth: null });
}

/*

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

    */

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT} ⚡`);
});
