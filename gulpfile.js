const gulp = require("gulp");
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const glsl = require('rollup-plugin-glsl')

gulp.task("build", end => {
    rollup.rollup({
        input: './src/Main.ts',
        onwarn: (waring, warn) => {
            if (waring.code == "CIRCULAR_DEPENDENCY") {
                console.log("循环引用了！");
                console.log("warnning Circular dependency:");
                console.log(waring);
            }
        },
        treeshake: false,
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "tsconfig.json",
                check: true,
                tsconfigOverride: {
                    compilerOptions: { removeComments: true },
                    module: "ES2015"
                },
                include: /.*.ts/,
            }),
            glsl({
                include: /.*(.glsl|.frag|.vert|.vs|.fs)$/,
                sourceMap: false,
                compress: false
            }),
        ]
    }).then(bundle => {
        end();
        return bundle.write({
            file: './bundle.js',
            format: 'iife',
            sourcemap: false
        });
    }).catch(err => {
        console.log(err);

    });
})