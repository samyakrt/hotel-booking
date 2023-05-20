import { Router } from 'express';
import { validateSchema } from '@/middlewares';
import { RegisterUserSchema } from '@/schemas';
import registerUser from './register-user';
import fetchUsers from './fetch-users';
import passport from 'passport';

const router = Router();

router.get('/',fetchUsers);
router.post('/login',passport.authenticate('session'));

router.post('/register',validateSchema(RegisterUserSchema), registerUser);

export default router;
