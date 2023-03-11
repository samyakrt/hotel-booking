import { Request, Response, Router } from 'express';
const router = Router();

router.get('/',(req: Request, res: Response) => {
    res.render('index', {
        script: 'main'
    });
});
export default router;
