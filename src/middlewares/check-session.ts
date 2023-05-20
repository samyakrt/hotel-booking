
import { AttachmentKey } from '@/shared/attachments';
import { UnauthorizedError } from '@/shared/errors';
import type { SimpleUser } from '@/srv/repos/users-repo';
import type {NextFunction, Request, Response} from 'express';

export const CurrentUserKey = AttachmentKey.from<SimpleUser>('CurrentUser');

const checkSession = (req: Request, res: Response, next: NextFunction) => {
    if(!req.isAuthenticated() && !req.user) {
        throw new UnauthorizedError();
    }
    const user = req.user;

    req.attachments.put('CurrentUser',user);
    next();
};

export default checkSession;
