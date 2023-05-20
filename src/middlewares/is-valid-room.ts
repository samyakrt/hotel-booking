import type { Room } from '@/models/Room';
import { AttachmentKey } from '@/shared/attachments';
import { NotFoundError } from '@/shared/errors';
import type { NextFunction, Request, Response } from 'express';

export const RoomKey = AttachmentKey.from<Room>('room');

const isValidRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { data:[room] } = await req.env.roomsRepo.fetchRooms({
        _id: req.params.room
    });

    if(!room) {
        throw new NotFoundError('room not found');
    }

    req.attachments.put('room',room);
    next();
};

export default isValidRoom;
