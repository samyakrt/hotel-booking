import type {Request, Response} from 'express';
const registerUser = async (req: Request, res: Response) => {
    const repo = req.env.usersRepo;
    const user = await repo.registerUser(req.body);
    return res.json(user);
};

export default registerUser;
