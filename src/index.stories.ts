import { withKnobs, number, color } from '@storybook/addon-knobs';
import LissajousLoader from './index';

export default {
	title: 'LissajousLoader',
	decorators: [withKnobs]
};

export const main = () => {
	const body = document.querySelector('body');
	if (body) {
		body.style.backgroundColor = color('Background colour', 'FFFFFF');
	}

	const canvas = document.createElement('canvas');
	const canvasSize = number('Canvas size', 50);
	canvas.width = canvasSize;
	canvas.height = canvasSize;

	const loader = new LissajousLoader(canvas, {
		xFrequency: number('X frequency', 3),
		yFrequency: number('Y frequency', 2),
		delta: Math.PI / number('Delta (PI/n), n = ', 2),
		step: number('Step', 0.05),
		padding: number('Padding', 8),
		colour: color('Colour', '000000'),
		lineWidth: number('Line width', 1),
	});
	loader.start();

	return canvas;
};
