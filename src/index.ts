import UserRoute from './routes/user.route';
import Server from './server/server';

const app = new Server([new UserRoute()]);

app.run();

/*
app.use(helmet());
app.use(express.json());
app.use('/test', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello Typescript with Node.js!');
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



main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });



app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT} ⚡`);
});
    */
