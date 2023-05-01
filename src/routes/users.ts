import type { Request, Response} from 'express';
import { Router } from 'express';

const router = Router();

const handler = (req: Request,res: Response) => {
    res.render('users', {
        script: 'Users',
        isLoggedIn: req.isAuthenticated()
    });
};

router.get(['/register','/login'], handler);

export default router;
