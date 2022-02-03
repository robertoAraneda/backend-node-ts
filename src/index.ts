import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello Typescript with Node.js!');
});

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT} ⚡`);
});
