import type { RegisterUserPayload } from '@/schemas/register-user-schema';
import { BadRequestError, ValidationFailedError } from '@/shared/errors';
import type { SimpleUser, User, UserFilter } from '@/srv/repos/users-repo';
import type UsersRepo from '@/srv/repos/users-repo';
import type { Model} from 'mongoose';
import handleDBError from '../helper';
import { comparePassword, hashPassword } from '@/shared/encrypt';
import mongoose from 'mongoose';
import omit from 'lodash/omit';

class DbUsersRepo implements UsersRepo {

    constructor(private user: Model<User>) { }

    async registerUser(payload: RegisterUserPayload): Promise<SimpleUser> {
        const password = hashPassword(payload.password);
        const row = await this.user.create({
            email: payload.email,
            name: payload.name,
            password,
            _id: new mongoose.Types.ObjectId()
        }).catch(handleDBError);

        return row;
    }

    async validateUser(email: string, password: string): Promise<SimpleUser> {
        const user = await this.user.findOne({
            email,
        });
        if (!user) {
            throw new BadRequestError('User not found');
        }

        if (!comparePassword(password,user.password)) {
            throw new ValidationFailedError('validation failed', {
                'email': ['invalid credentials']
            });
        }
        const row = user.toJSON();
        return omit(row,'password');
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

