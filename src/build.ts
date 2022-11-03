import fs from 'fs-extra';
import ChildProcess from 'child_process';

(async () => {
    try {
        await remove('dist');
        await exec('tsc --build tsconfig.json', './');
        await copy('./src/views', './dist/views');
        await copy('./src/public', './dist/public');
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
})();

function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest).catch(err => {
            return rej(err);
        })
            .then(() => res());
    });
}

function remove(dir: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(dir, (err) => err ? rej(err) : res());
    });
}

function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return ChildProcess.exec(cmd, { cwd: loc }, (err, stdout) => {
            if (err) {
                console.error(err);
            }
            console.log(stdout);

            return err ? rej(err) : res();
        });
    });
}
