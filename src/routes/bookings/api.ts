import { isValidRoom, validateSchema } from '@/middlewares';
import CreateBookingSchema from '@/schemas/create-booking-schema';
import { Router } from 'express';
import addNewBooking from './add-new-booking';
import checkSession from '@/middlewares/check-session';
import fetchBookings from './fetch-bookings';

const router = Router();

router.get('/',checkSession,fetchBookings);
router.post('/:room/new', isValidRoom,validateSchema(CreateBookingSchema), addNewBooking);

export default router;
