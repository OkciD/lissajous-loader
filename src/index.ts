import { range } from './utils';

interface Point {
	x: number;
	y: number;
}

export interface Props {
	xFrequency: number;
	yFrequency: number;
	delta: number;
	step?: number;
	padding?: number;
	colour?: string;
	lineWidth?: number;
	pause?: number;
}

export default class LissajousLoader {
	private readonly canvas: HTMLCanvasElement
	private readonly context: CanvasRenderingContext2D;
	private readonly props: Props;
	private readonly points: Point[];
	private currentPointIndex: number = 0;
	private reverse: boolean = false;
	private requestId: number | null = null;

	constructor(canvas: HTMLCanvasElement, props: Props) {
		this.canvas = canvas;

		const context = this.canvas.getContext('2d');
		if (!context) {
			throw Error('Unable to get 2d context from canvas');
		}
		this.context = context;

		this.props = {...props};

		this.points = this.calculatePoints();
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
		const { step = 0.05, xFrequency, yFrequency, delta } = this.props;

		const args = range(0, 2 * Math.PI, step);
		args.push(2 * Math.PI);

		return args
			.map((arg) => ({
				x: Math.sin(xFrequency * arg + delta), // берём амплитуду по x равной 1
				y: Math.sin(yFrequency * arg), // берём амплитуду по y равной 1
			}))
			.map(this.convertPoint);
	}

	public start(): void {
		const { colour = '000000', lineWidth = 1 } = this.props;

		this.context.lineCap = 'round';
		this.context.strokeStyle = colour;
		this.context.fillStyle = colour;
		this.context.lineWidth = lineWidth;

		this.requestId = requestAnimationFrame(this.drawingStep);
	}

	public stop(): void {
		if (this.requestId) {
			cancelAnimationFrame(this.requestId);
			this.requestId = null;
			this.clear();
		}
	};

	public clear(): void {
		const { width, height } = this.canvas;
		this.context.clearRect(0, 0, width, height);
	}

	private readonly drawingStep = (): void => {
		const { pause = 1000 } = this.props;

		if (this.currentPointIndex >= this.points.length) {
			this.currentPointIndex = 0;
			this.reverse = !this.reverse;

			setTimeout(() => {
				this.requestId = requestAnimationFrame(this.drawingStep);
			}, pause);

			return;
		}

		this.clear();
		this.context.beginPath();

		if (this.reverse) {
			const initialPoint = this.points[this.currentPointIndex];
			this.context.moveTo(initialPoint.x, initialPoint.y);

			for(let i = this.currentPointIndex + 1; i < this.points.length; i++) {
				const { x, y } = this.points[i];
				this.context.lineTo(x, y);
			}
		} else {
			const initialPoint = this.points[0];
			this.context.moveTo(initialPoint.x, initialPoint.y);

			for(let i = 1; i <= this.currentPointIndex; i++) {
				const { x, y } = this.points[i];
				this.context.lineTo(x, y);
			}
		}

		this.context.stroke();

		this.currentPointIndex++;
		this.requestId = requestAnimationFrame(this.drawingStep);
	}
}

