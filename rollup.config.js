import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/lissajous-loader.js',
		name: 'lissajous-loader',
		format: 'umd'
	},
	plugins: [
		clear({
			targets: ['dist'],
		}),
		typescript({
			tsconfig: "tsconfig.prod.json",
		}),
		terser({
			format: {
				comments: false
			}
		}),
	]
};
