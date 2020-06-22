const gulp = require("gulp");
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const glsl = require('rollup-plugin-glsl')
const marisa = require('./plugins/rollup/rollup-plugin-marisa');

gulp.task("build", end => {
    rollup.rollup({
        input: './src/Main.ts',
        onwarn: (waring, warn) => {
            if (waring.code == "CIRCULAR_DEPENDENCY") {
                console.log("产生了错误的魔法： 魔力循环");
                console.log("warnning Magic Error : Circular dependency:");
                console.log(waring);
            }
        },
        treeshake: false,
        plugins: [
            resolve(),
            marisa({
                include: /.*.marisa/,
            }),
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
            })
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