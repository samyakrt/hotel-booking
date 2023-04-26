import type { Request } from 'express';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import hbs from 'hbs';

import AppRouter from '@/routes/app';
import env from '@/shared/env';
import mongoose from 'mongoose';
import handleError from '@/middlewares/handle-error';
import DbUsersRepo from '@/infra/repos/db-users-repo';
import { Room, UserModel } from '@/models';
import DbRoomsRepo from './infra/repos/db-rooms-repo';
import ApiRouter from '@/routes/api';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import type { SimpleUser } from './srv/repos/users-repo';

const main = async () => {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const viewDir = path.join(__dirname, 'views');
    app.set('views', viewDir);
    app.set('view engine', 'hbs');
    hbs.registerPartials(path.join(__dirname, 'views', 'layout'));
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));

    app.use(session({
        name: 'token',
        secret: env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: env.SESSION_AGE,
            sameSite: 'strict',
        }
    }));

    mongoose.connect(env.DATABASE_URL).then(() => {
        console.log('db connected');
    }).catch(err => console.error(err));

    const usersRepo = new DbUsersRepo(UserModel);
    app.use((req: Request, _, next) => {
        req.env = {
            usersRepo: usersRepo,
            roomsRepo: new DbRoomsRepo(Room)
        };
        next();
    });

    app.get('/', (req, res) => res.redirect('/app'));
    app.use('/app', AppRouter);
    app.use('/api', ApiRouter);

    passport.use(new Strategy({
        usernameField: 'email',
    }, async (email: string, password: string, done) => {
        const user = await usersRepo.validateUser(email, password).catch(err => done(err,false)) ;

        if(!user)  return done(null,false);

        return done(null, user);
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser<SimpleUser>(function (user, done) {
        done(null, Object.values(user) ? user : null);
    });

    app.use(handleError);

    app.use((req, res) => res.render('statuspage', {
        script: 'StatusPage',
        statusType: 'notfound',
        isLoggedIn: Boolean(req.isAuthenticated)
    })
    );
    return app;
};

export default main;
