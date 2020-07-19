import { range } from './utils';

interface Point {
	x: number;
	y: number;
}

interface Props {
	xFrequency: number;
	yFrequency: number;
	delta: number;
	step?: number;
	padding?: number;
}

export default class LissajousLoader {
	private readonly canvas: HTMLCanvasElement
	private readonly context: CanvasRenderingContext2D;
	private readonly props: Props;
	private readonly pointsIterator: IterableIterator<Point>;

	constructor(canvas: HTMLCanvasElement, props: Props) {
		this.canvas = canvas;

		const context = this.canvas.getContext('2d');
		if (!context) {
			throw Error('Unable to get 2d context from canvas');
		}
		this.context = context;

		this.props = {...props};

		const points = this.calculatePoints();
		this.pointsIterator = points.values();
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

	private calculatePoints(): Array<Point> {
		const { step = 0.01, xFrequency, yFrequency, delta } = this.props;

		const args = range(0, 2 * Math.PI, step);

		return args
			.map((arg) => ({
				x: Math.sin(xFrequency * arg + delta), // берём амплитуду по x равной 1
				y: Math.sin(yFrequency * arg), // берём амплитуду по y равной 1
			}))
			.map(this.convertPoint);
	}

	public start(): void {
		const initialPoint = this.pointsIterator.next().value;

		this.context.beginPath();
		this.context.lineCap = 'round';
		this.context.moveTo(initialPoint.x, initialPoint.y);

		requestAnimationFrame(this.drawingStep)
	}

	private readonly drawingStep = () => {
		const { done, value } = this.pointsIterator.next();
		if (done) {
			return;
		}

		const { x, y } = value;
		this.context.fillRect(x, y, 1, 1);
		this.context.stroke();

		requestAnimationFrame(this.drawingStep);
	}
}

