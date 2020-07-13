interface Point {
	x: number;
	y: number;
}

export default class LissajousLoader {
	constructor(private canvas: HTMLCanvasElement) {
	}

	/**
	 * Конвертирует координаты точки тригонометрического круга в координаты точки на канвасе
	 */
	private readonly convertPoint = ({x, y}: Point): Point => {
		const { width, height } = this.canvas;
		const center: Point = {
			x: width / 2,
			y: height / 2,
		};

		return {
			x: center.x + (x * width / 2),
			y: center.y - (y * height / 2),
		};
	}

	public start(): void {
		const context = this.canvas.getContext('2d');
		if (!context) {
			throw new Error('Unable to get context');
		}

		const points: Point[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }]
			.map(this.convertPoint);

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);

		points.forEach(({x, y}, index) => {
			setTimeout(() => {
				context.lineTo(x, y);
				context.stroke();
			}, index * 1000)
		});
	}
}

