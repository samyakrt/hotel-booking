import esbuild from 'esbuild';
import esBuildTsc from 'esbuild-plugin-tsc';
import path from 'path';
import argsParser from 'yargs-parser';

const args = argsParser(process.argv);
const isProd = process.env.NODE_ENV === 'production';
const watch = Boolean(args.watch);

(
    () => {
        esbuild.build({
            outdir: path.join('..', isProd? 'dist': 'src', 'public', 'js'),
            entryPoints: [
                path.join('./', 'main.tsx')
            ],
            plugins: [
                esBuildTsc({
                    tsx: true
                })
            ],
            loader: {
                '.ts': 'tsx'
            },
            minify: isProd,
            sourcemap: !isProd,
            bundle: true,
            watch,

        }).catch(err => {
            console.error(err);
            process.exit(1);
        });
    })();
