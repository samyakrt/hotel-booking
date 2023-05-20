import { RoomKey } from '@/middlewares/is-valid-room';
import type { Request, Response } from 'express';

const addNewBooking = async (req: Request, res: Response) => {
    const repo = req.env.bookingRepo;
    const room = req.attachments.get(RoomKey);

    const booking = await repo.addNewBooking({
        ...req.body,
        rentPerDay: room.rentPerDay,
    }, req.params.room, req.user._id as string);
    res.json(booking);
};

export default addNewBooking;
