import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const loginUser = (req: Request, res: Response, next: NextFunction) => {
     passport.authenticate('local',{},(err: unknown, user: Express.User) => {

        if(err) next(err);

        if(user) res.json(user);

    })(req,res,next);
};

export default loginUser;
