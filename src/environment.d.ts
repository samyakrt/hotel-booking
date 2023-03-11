import UsersRepo from '@/srv/repos/users-repo';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        },
        env: {
          usersRepo: UsersRepo
        }
    }
}
export  {};
