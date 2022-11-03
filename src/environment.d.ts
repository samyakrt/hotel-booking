
declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        }
    }
}
export  {};
