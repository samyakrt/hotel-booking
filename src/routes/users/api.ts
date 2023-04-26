import { Router } from 'express';
import loginUser from './login-user';
import { validateSchema } from '@/middlewares';
import { RegisterUserSchema } from '@/schemas';
import registerUser from './register-user';
import fetchUsers from './fetch-users';

const router = Router();

router.get('/',fetchUsers);

router.post('/login',loginUser);

router.post('/register',validateSchema(RegisterUserSchema), registerUser);

export default router;
