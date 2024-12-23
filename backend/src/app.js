import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRouter from './routes/user.routes.js';
import NoticeRouter from './routes/notice.routes.js'
import NoteRouter from './routes/note.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: '64kb'}));
app.use(urlencoded({ limit: '64kb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/notices", NoticeRouter);
app.use("/api/v1/notes", NoteRouter);

export default app;