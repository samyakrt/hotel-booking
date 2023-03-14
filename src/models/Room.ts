import { model, Schema, SchemaTypes, InferSchemaType } from 'mongoose';

const CurrentBookingSchema = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    userId: { type: Number }
});

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    imageUrls: {
        type: SchemaTypes.Array,
    },
    currentBookings: {
        type: [CurrentBookingSchema],
    },
    type :{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export type Room = InferSchemaType<typeof RoomSchema>

const RoomModel = model<Room>('rooms', RoomSchema);

export default RoomModel;
