import { CurrentUserKey } from '@/middlewares/check-session';
import type {Request, Response} from 'express';

const fetchBookings = async (req: Request, res: Response) => {
    const br = req.env.bookingRepo;
    const currentUser = req.attachments.get(CurrentUserKey);
    const bookings = await br.fetchBookings({
        ...req.query,
        userId: currentUser._id,
    });

    return res.json(bookings);
};

export default fetchBookings;
