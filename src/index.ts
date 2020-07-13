import { range } from './utils';

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

	private calculatePoints() {
		const args = range(0, 2 * Math.PI, 0.01);
		const xFrequence = 2;
		const yFrequence = 3;

		return args
			.map((arg) => ({
				x: Math.sin(xFrequence * arg), // берём амплитуду по x равной 1
				y: Math.sin(yFrequence * arg), // берём амплитуду по y равной 1
			}))
			.map(this.convertPoint);
	}

	public start(): void {
		const context = this.canvas.getContext('2d');
		if (!context) {
			throw new Error('Unable to get context');
		}

		const points: Point[] = this.calculatePoints();

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);

		points.forEach(({x, y}, index) => {
			setTimeout(() => {
				context.lineTo(x, y);
				context.stroke();
			}, index * 10)
		});
	}
}
