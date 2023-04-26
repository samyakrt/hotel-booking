import type { Request, Response} from 'express';
import { Router } from 'express';

const router = Router();

const handler = (req: Request,res: Response) => {
    res.render('index', {
        script: 'users',

    });
};
router.get('/login', handler);

export default router;
