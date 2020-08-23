import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: {
		file: 'lissajous-loader.js',
		name: 'lissajous-loader',
		format: 'umd'
	},
	plugins: [
		typescript({
			tsconfig: "tsconfig.prod.json",
		}),
		terser({
			format: {
				comments: false
			}
		})
	]
};
