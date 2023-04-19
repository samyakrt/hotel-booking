import { Router } from 'express';
import RoomRouter from '../rooms/api';
const router = Router();

router.use('/rooms',RoomRouter);

export default router;
