import type UsersRepo from '@/srv/repos/users-repo';
import type RoomsRepo from '@/srv/repos/rooms-repo';
import type { SimpleUser } from '@/srv/repos/users-repo';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        },
        env: {
          usersRepo: UsersRepo,
          roomsRepo: RoomsRepo
        }
        user: SimpleUser
    }
    export type User = SimpleUser;
}
export  {};
