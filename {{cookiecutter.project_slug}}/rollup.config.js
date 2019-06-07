import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'


const develop = process.env.ROLLUP_WATCH


/**
 * Plugin for copying files and directories.
 *
 * @param options copy options
 * @returns generateBundle hook
 */
const copy = function(options) {
    return {
        generateBundle() {
            fs.ensureDirSync(path.dirname(options.dest))
            fs.copy(options.src, options.dest)
            return
        }
    }
}


/**
 * Plugin to render a Nunjucks template.
 *
 * @param options render options
 * @returns generateBundle hook
 */
const render = function(options) {
    // TODO: Handle entire directories as well as individual files.
    return {
        generateBundle() {
            let context = typeof options.context === "undefined" ? {} : options.context;
            if (typeof options.context === 'string' || options.context instanceof String) {
                context = fs.readJSONSync(options.context)
            }
            const content = nunjucks.render(options.src, context)
            fs.ensureDirSync(path.dirname(options.dest))
            fs.outputFileSync(options.dest, content)
            return
        }
    }
}


export default {
	input: 'src/script/main.ts',
	output: {
		file: 'dist/script/main.js',
		format: 'esm',
		sourcemap: true
	},
	plugins: [
        copy({
            src:  'src/style/',
            dest: 'dist/style/'
        }),
        render({
            src:  'src/html/index.html.njk',
            dest: 'dist/index.html',
            context: 'src/html/context.json',
        }),
		typescript(),
		resolve(),  // locate packages in node_modules
		!develop && terser(),  // minify in production
	]
}
