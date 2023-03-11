import { Schema, model, InferSchemaType } from 'mongoose';
import { User } from '@/srv/repos/users-repo';

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true,'email required']
    },
    password: {
        type: Buffer,
        required: [true,'email required']
    },
    createdAt: {
        type: Date,
        default: new Date()

    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

type Test = InferSchemaType<typeof UserSchema>

const User = model<User>('users', UserSchema);
export default User;
