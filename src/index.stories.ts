import LissajousLoader from './index';

export default { title: 'LissajousLoader' };

export const main = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 120;
	canvas.height = 120;

	const loader = new LissajousLoader(canvas);

	return canvas;
};
