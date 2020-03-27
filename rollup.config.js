import babel from 'rollup-plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import run from '@rollup/plugin-run'

export default {
    input: 'index.js',
    output: {
        format: 'cjs',
        file: 'compiled.js'
    },
    plugins: [
        babel(),
        cjs(),
        run()
    ]
}