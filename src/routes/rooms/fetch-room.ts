import type {Request, Response} from 'express';

const fetchRoom = async(req: Request, res: Response) => {
    const ro = req.env.roomsRepo;
    const { data: [room] } = await ro.fetchRooms({_id: req.params.roomId as string});

    return res.json(room);
};

export default fetchRoom;
