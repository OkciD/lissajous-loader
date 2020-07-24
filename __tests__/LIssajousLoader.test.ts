// @ts-ignore
import canvasSerializer from 'jest-canvas-snapshot-serializer';
import LissajousLoader, { Props } from '../src';

expect.addSnapshotSerializer(canvasSerializer);

let requestAnimationFrameMock: jest.SpyInstance;
let cancelAnimationFrameMock: jest.SpyInstance;

let canvas: HTMLCanvasElement;

const RAF_TIMEOUT = 16;
const POINTS_COUNT = 125;
const ITERATIONS_COUNT = POINTS_COUNT + 1;
const PAUSE = 1000;
const defaultProps: Props = {
	xFrequency: 3,
	yFrequency: 2,
	delta: Math.PI / 2,
	step: 2 * Math.PI / POINTS_COUNT,
	pause: PAUSE,
};

jest.useFakeTimers();

describe('LissajousLoader', () => {
	beforeEach(() => {
		requestAnimationFrameMock = jest.spyOn(window, 'requestAnimationFrame')
			.mockImplementation((callback: FrameRequestCallback) => {
				return setTimeout(callback, 16);
			});

		cancelAnimationFrameMock = jest.spyOn(window, 'cancelAnimationFrame')
			.mockImplementation((requestId: number) => {
				return clearTimeout(requestId);
			});

		canvas = document.createElement('canvas');
		canvas.width = 60;
		canvas.height = 60;
	});

	it('should render nothing without start() called', () => {
		const loader = new LissajousLoader(canvas, defaultProps);

		expect(canvas).toMatchSnapshot();
	});

	it(`should render the whole figure after ${ITERATIONS_COUNT} iterations`, () => {
		const loader = new LissajousLoader(canvas, defaultProps);
		loader.start();
		jest.advanceTimersByTime(ITERATIONS_COUNT * RAF_TIMEOUT);

		expect(canvas).toMatchSnapshot();
	});

	it.skip(`should clear a figure after 2 * ${ITERATIONS_COUNT} iterations (+ pause)`, () => {
		const loader = new LissajousLoader(canvas, defaultProps);
		loader.start();
		jest.advanceTimersByTime(2 * (ITERATIONS_COUNT - 1) * RAF_TIMEOUT + PAUSE);

		expect(canvas).toMatchSnapshot();
	});

	afterEach(() => {
		requestAnimationFrameMock.mockRestore();
		cancelAnimationFrameMock.mockRestore();
	});
});
