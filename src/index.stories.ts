import { withKnobs, number, color } from '@storybook/addon-knobs';
import LissajousLoader from './index';

export default {
	title: 'LissajousLoader',
	decorators: [withKnobs]
};

export const main = () => {
	const canvas = document.createElement('canvas');
	const canvasSize = number('Canvas size', 80);
	canvas.width = canvasSize;
	canvas.height = canvasSize;

	const loader = new LissajousLoader(canvas, {
		xFrequency: number('X frequency', 3),
		yFrequency: number('Y frequency', 2),
		delta: number('Delta', Math.PI / 2),
		step: number('Step', 0.05),
		padding: number('Padding', 16),
		colour: color('Colour', '000000'),
	});
	loader.start();

	return canvas;
};
