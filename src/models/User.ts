import type { InferSchemaType} from 'mongoose';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';

const UserSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
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
        required: [true,'password required']
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

UserSchema.plugin(uniqueValidator);
export type User = InferSchemaType<typeof UserSchema>

const UserModel = model('users', UserSchema);

export default UserModel;
