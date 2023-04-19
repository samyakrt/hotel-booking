import type { Request, Response} from 'express';
import { Router } from 'express';
const router = Router();

router.get(['/','/rooms/:roomId'],(req: Request, res: Response) => {
    res.render('index', {
        script: 'main'
    });
});
export default router;
