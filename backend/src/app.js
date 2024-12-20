import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRouter from './routes/user.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: '64kb'}));
app.use(urlencoded({ limit: '64kb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    next();
});

app.use("/api/v1/users", UserRouter);

export default app;