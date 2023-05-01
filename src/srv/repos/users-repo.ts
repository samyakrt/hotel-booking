import type { User as UserModel } from '@/models/User';
import type { RegisterUserPayload } from '@/schemas/register-user-schema';

interface UsersRepo {
    fetchUsers(filter: UserFilter):Promise<SimpleUser[]>;
    validateUser(email:string,password: string): Promise<SimpleUser>;
    registerUser(payload: RegisterUserPayload): Promise<SimpleUser>
}

export default UsersRepo;

export type User = UserModel
export type SimpleUser = Omit<User,'password'>

export interface UserFilter {
    _id?: string;
    email?: string;
}
