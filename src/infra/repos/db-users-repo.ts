import type { RegisterUserPayload } from '@/schemas/register-user-schema';
import { BadRequestError, ValidationFailedError } from '@/shared/error';
import type { SimpleUser, User, UserFilter } from '@/srv/repos/users-repo';
import type UsersRepo from '@/srv/repos/users-repo';
import type { Model} from 'mongoose';
import mongoose from 'mongoose';

class DbUsersRepo implements UsersRepo {

    constructor(private user: Model<User>) { }

    async registerUser(payload: RegisterUserPayload): Promise<SimpleUser> {
        const password = Buffer.from(payload.password, 'utf-8');
        const doc = new this.user({
            email: payload.email,
            name: payload.name,
            password,
        });

        // const err =  doc.validateSync();

        // console.log(err);
        // if(err instanceof mongoose.Error.ValidationError) {
        // }
        const row = await doc.save();

        return row;
    }

    async validateUser(email: string, password: string): Promise<SimpleUser> {
        const user = await this.user.findOne({
            email
        });

        if (!user) {
            throw new BadRequestError('User not found');
        }

        if (user.password.toString() !== password) {
            throw new ValidationFailedError('validation failed', {
                'email': ['invalid credentials']
            });
        }

        return user;
    }

    async fetchUsers(filter: UserFilter): Promise<SimpleUser[]> {

        const query =  this.user.find<User>();

        if(filter.email) {
            query.where('email',filter.email);
        }
        if(filter._id) {
            query.where('_id',filter._id);
        }

        const users = await query;
        return users.map(u => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            createdAt: new Date(u.createdAt),
            updatedAt: new Date(u.updatedAt)
        }));
    }
}

export default DbUsersRepo;

