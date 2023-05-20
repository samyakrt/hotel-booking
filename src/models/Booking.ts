import { getDaysDiff } from '@/shared/dates';
import type { InferSchemaType } from 'mongoose';
import { model, Schema, Types } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const BookingSchema = new Schema({
    _id: Types.ObjectId,
    roomId: {
        type: String,
        required: true
    },
    room: {
        type: Types.ObjectId,
        ref: 'rooms'
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        //  required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
}, {
    timestamps: true,
    virtuals: {
        totalDays: {
            get() {
                return getDaysDiff(this.from, this.to);
            }
        },
        totalAmount: {
            get() {
                return this.rentPerDay * getDaysDiff(this.from, this.to);
            }
        }
    },
});

BookingSchema.index({ roomId: 1, fromDate: 1, toDate: 1 }, { unique: true });

BookingSchema.plugin(mongooseUniqueValidator);

export type Booking = InferSchemaType<typeof BookingSchema> & Partial<typeof BookingSchema.virtuals>;

export const BookingModel = model('bookings', BookingSchema);

export default BookingModel;
