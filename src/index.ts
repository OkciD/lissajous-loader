import { range } from './utils';

interface Point {
	x: number;
	y: number;
}

interface Props {
	xFrequency: number;
	yFrequency: number;
	delta: number;
	step: number;
	period: number;
	padding?: number;
}

export default class LissajousLoader {
	constructor(private canvas: HTMLCanvasElement, private props: Props) {
	}

	/**
	 * Конвертирует координаты точки тригонометрического круга в координаты точки на канвасе
	 */
	private readonly convertPoint = ({x, y}: Point): Point => {
		const { width, height } = this.canvas;
		const { padding = 16 } = this.props;

		const center: Point = {
			x: width / 2,
			y: height / 2,
		};

		return {
			x: center.x + (x * (width - padding) / 2),
			y: center.y - (y * (height - padding) / 2),
		};
	}

	private calculatePoints() {
		const { step, xFrequency, yFrequency, delta } = this.props;

		const args = range(0, 2 * Math.PI, step);

		return args
			.map((arg) => ({
				x: Math.sin(xFrequency * arg + delta), // берём амплитуду по x равной 1
				y: Math.sin(yFrequency * arg), // берём амплитуду по y равной 1
			}))
			.map(this.convertPoint);
	}

	public start(): void {
		const context = this.canvas.getContext('2d');
		if (!context) {
			throw new Error('Unable to get context');
		}

		const points: Point[] = this.calculatePoints();
		const timePerPoint = this.props.period / points.length;

		context.beginPath();
		context.lineCap = 'round';
		context.moveTo(points[0].x, points[0].y);

		points.forEach(({x, y}, index) => {
			setTimeout(() => {
				// context.lineTo(x, y);
				context.fillRect(x, y, 1, 1);
				context.stroke();
			}, index * timePerPoint)
		});
	}
}

