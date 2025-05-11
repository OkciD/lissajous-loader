import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/lissajous-loader.js',
		name: 'lissajous-loader',
		format: 'umd',
		sourcemap: false,
	},
	plugins: [
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
