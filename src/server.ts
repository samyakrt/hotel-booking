import express, { Request } from 'express';
import cors from 'cors';
import path from 'path';
import hbs from 'hbs';
import 'express-async-errors';

import AppRouter from '@/routes/app';
import cookieSession from 'cookie-session';
import env from '@/shared/env';
import mongoose from 'mongoose';
import handleError from '@/middlewares/handle-error';
import DbUsersRepo from '@/infra/repos/db-users-repo';
import { User } from '@/models';

const main = async () => {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const viewDir = path.join(__dirname, 'views');
    app.set('views', viewDir);
    app.set('view engine', 'hbs');
    hbs.registerPartials(path.join(__dirname,'views','layout'));
    const staticDir = path.join(__dirname,'public');
    app.use(express.static(staticDir));

    app.use(cookieSession({
        maxAge: env.SESSION_AGE,
        name:'token',
        sameSite: 'strict',
        secret: env.SESSION_KEY,
    }));

    await  mongoose.connect(env.DATABASE_URL).then(() => {
        console.log('db connected');
    }).catch(err => console.error(err));

    app.use((req: Request,_,next) => {
        req.env = {
            usersRepo: new DbUsersRepo(User)
        };
        next();
    });

    app.get('/',(req,res) => res.redirect('/app'))
    app.use('/app',AppRouter);

    app.use(handleError);
    return app;
};

export default main;
