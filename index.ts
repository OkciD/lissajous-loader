interface Point {
	x: number;
	y: number;
}

class LissajousLoader {
	constructor(private canvas: HTMLCanvasElement) {
	}

	/**
	 * Конвертирует координаты точки тригонометрического круга в координаты точки на канвасе
	 */
	private convertPoint({x, y}: Point): Point {
		const { width, height } = this.canvas.getBoundingClientRect();
		const center: Point = {
			x: width / 2,
			y: height / 2,
		};

		return {
			x: center.x + (x * width / 2),
			y: center.y - (y * height / 2),
		};
	}
}

const canvas = document.querySelector('canvas');
if (!canvas) {
	throw new Error();
}

const loader = new LissajousLoader(canvas);
