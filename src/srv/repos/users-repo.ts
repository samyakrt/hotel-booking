interface UsersRepo {
    fetchUsers(filter: UserFilter):Promise<User[]>;
}

export default UsersRepo;

export interface User {
    _id: string
    name: string
    email: string
    password: Buffer,
    createdAt: Date
    updatedAt: Date
}

export interface UserFilter {
    _id?: string;
    email?: string;
}
