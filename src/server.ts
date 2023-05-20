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
import { BookingModel, Room, UserModel } from '@/models';
import DbRoomsRepo from './infra/repos/db-rooms-repo';
import ApiRouter from '@/routes/api';
import passport, { use } from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import type { SimpleUser } from './srv/repos/users-repo';
import UserRouter from './routes/users';
import PinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import DbBookingRepo from './infra/repos/db-booking-repo';
import Attachments from './shared/attachments';

const main = async () => {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    app.use(PinoHttp({
        quietReqLogger: true,
        transport: {
            target: 'pino-http-print',
            options: {
                destination: 1,
                all: false,
                translateTime: true
            }
        }
    }));

    const viewDir = path.join(__dirname, 'views');
    app.set('views', viewDir);
    app.set('view engine', 'hbs');
    hbs.registerPartials(path.join(__dirname, 'views', 'layout'));
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));

    mongoose.connect(env.DATABASE_URL).then(() => {
        console.log('db connected');
    }).catch(err => console.error(err));

    const usersRepo = new DbUsersRepo(UserModel);

    app.use((req: Request, _, next) => {
        req.env = {
            usersRepo: usersRepo,
            roomsRepo: new DbRoomsRepo(Room),
            bookingRepo: new DbBookingRepo(BookingModel)
        };
        req.attachments = new Attachments();
        next();
    });

    /* ----------------------------PASSPORT JS --------------------------------------------------- */
    app.use(passport.initialize());
    app.use(session({
        secret: env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: env.SESSION_AGE
        },
        store: connectMongo.create({
            mongoUrl: env.DATABASE_URL,
        })

    }));
    app.use(passport.session());

    passport.use(new Strategy({
        usernameField: 'email',
    }, async (email: string, password: string, done) => process.nextTick(async () => {
        const user = await usersRepo.validateUser(email, password).catch(err => done(err, false));

        if (!user)  {
            return done('user not found', false);
        }

        return done(null, user);
    }) ) );

    passport.serializeUser((user: Express.User, done) => {
        done(null, (user as SimpleUser)._id);
    });

    passport.deserializeUser<string>((_id, done) =>  process.nextTick(async() => {

        if (_id) {
            const [user] = await usersRepo.fetchUsers({
                _id
            });
            return done(null, user);
        }
        return done(null,false);
    }));
    /*----------------------------END --------------------------------------------------- */

    app.get('/', (req,res) => res.redirect('/app'));
    app.use('/app', passport.authenticate('session'),AppRouter);
    app.use('/users',  UserRouter);
    app.use('/api',ApiRouter);

    app.use(handleError);
    return app;
};

export default main;
