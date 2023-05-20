import type { Types } from 'mongoose';

export type AppendObjectId<T extends object> = {_id: Types.ObjectId} & T
