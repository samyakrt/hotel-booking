import type { User, UserFilter } from '@/srv/repos/users-repo';
import type UsersRepo from '@/srv/repos/users-repo';
import type { Model } from 'mongoose';

class DbUsersRepo implements UsersRepo {

    constructor(private user: Model<User>){}

    async fetchUsers(filter: UserFilter): Promise<User[]> {

        const users = await this.user.find<User>({
            email: filter.email,
            _id: filter._id
        });

        return users.map(u => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            password: u.password,
            createdAt: new Date(u.createdAt),
            updatedAt: new Date(u.updatedAt)
        }));
    }
}

export default DbUsersRepo;

