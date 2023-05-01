import type { Request, Response } from 'express';

const fetchUsers = async (req: Request, res: Response) => {
    const repo = req.env.usersRepo;
    const users = await repo.fetchUsers(req.query);

    return res.json(users);
};

export default fetchUsers;
