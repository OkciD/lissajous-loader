class LissajousLoader {
	private canvasContext: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		if (!canvas) {
			throw new Error('No canvas');
		}

		const context = canvas.getContext('2d');
		if (!context) {
			throw new Error('Can not get canvas rendering context');
		}

		this.canvasContext = context;
	}
}

const canvas = document.querySelector('canvas');
if (!canvas) {
	throw new Error();
}

const loader = new LissajousLoader(canvas);
