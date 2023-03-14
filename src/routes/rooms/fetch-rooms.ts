import { Request, Response } from 'express';

const fetchRooms = async (req: Request, res: Response) => {
    const rm = req.env.roomsRepo;
    const rooms = await rm.fetchRooms(req.query);

    res.json(rooms);
};

export default fetchRooms;
