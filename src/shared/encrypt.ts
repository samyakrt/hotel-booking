import { hashSync, compareSync } from 'bcrypt';
export const hashPassword =   (password: string) => {
    const hashed =  hashSync(password,10);

    return Buffer.from(hashed,'utf-8');
};

export const comparePassword = (password: string, hash: Buffer) =>  compareSync(password, hash.toString('utf-8'));
