import { Router } from 'express';
import RoomRouter from '@/routes/rooms/api';
import UserRouter from '@/routes/users/api';
import BookingRouter from '@/routes/bookings/api';
import passport from 'passport';

const router = Router();

router.use('/rooms',RoomRouter);
router.use('/users', UserRouter);
router.use('/booking', passport.authenticate('session'), BookingRouter);

export default router;
