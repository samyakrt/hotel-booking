import type UsersRepo from '@/srv/repos/users-repo';
import type RoomsRepo from '@/srv/repos/rooms-repo';
import { SimpleUser } from '@/srv/repos/users-repo';
import type BookingRepo from './srv/repos/booking-repo';
import type Attachments from './shared/attachments';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        },
        env: {
          usersRepo: UsersRepo,
          roomsRepo: RoomsRepo,
          bookingRepo: BookingRepo
        }
        user: SimpleUser
        attachments: Attachments
    }
    User = SimpleUser;
}
export  {};
