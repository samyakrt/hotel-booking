import 'dotenv/config';
import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env,{
    JWT_SECRET: str({
        default:'secret'
    }),
    SESSION_AGE: num({
        default: 24 * 60 * 60 * 1000 
    }),
    SESSION_KEY: str({
        default:'password'
    }),
    DATABASE_URL: str({
        default:'mongodb://localhost:27017/booking'
    })
});

export default env;
