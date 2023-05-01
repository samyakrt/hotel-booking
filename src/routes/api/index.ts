import { Router } from 'express';
import RoomRouter from '@/routes/rooms/api';
import UserRouter from '@/routes/users/api';

const router = Router();

router.use('/rooms',RoomRouter);
router.use('/users',UserRouter);

export default router;
