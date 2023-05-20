import { UnexpectedError } from './errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AttachmentKey<T> {

    constructor(public key: string) {}

    static from<T>(key: string) {
        return new AttachmentKey<T>(key);
    }
}
class Attachments {
    protected map: Map<string,unknown> = new Map();

    get<T>(ak: AttachmentKey<T>): T {

        if(this.map.has(ak.key)) {
            return this.map.get(ak.key) as T;
        }
        throw new UnexpectedError('invalid attachment');
    }

    put<T extends object>(key: string, value: T) {
        this.map.set(key,value);
    }
}

export default Attachments;
