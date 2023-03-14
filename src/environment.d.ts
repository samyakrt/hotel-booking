import UsersRepo from '@/srv/repos/users-repo';
import RoomsRepo from '@/srv/repos/rooms-repo';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        },
        env: {
          usersRepo: UsersRepo,
          roomsRepo: RoomsRepo
        }
    }
}
export  {};
