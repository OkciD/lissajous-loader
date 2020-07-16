import { withKnobs, number } from "@storybook/addon-knobs";
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

	const loader = new LissajousLoader(canvas);
	loader.start();

	return canvas;
};
