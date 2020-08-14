// @ts-ignore
import canvasSerializer from 'jest-canvas-snapshot-serializer';
import LissajousLoader, { Props } from '../src';

expect.addSnapshotSerializer(canvasSerializer);

let requestAnimationFrameMock: jest.SpyInstance;
let cancelAnimationFrameMock: jest.SpyInstance;

let canvas: HTMLCanvasElement;

const RAF_TIMEOUT = 16;
const POINTS_COUNT = 125;
const DRAWING_ITERATIONS_COUNT = POINTS_COUNT + 1;
const FULL_CYCLE_ITERATIONS_COUNT = 2 * DRAWING_ITERATIONS_COUNT + 1;
const PAUSE = 1000;
const defaultProps: Props = {
	xFrequency: 3,
	yFrequency: 2,
	delta: Math.PI / 2,
	step: 2 * Math.PI / POINTS_COUNT,
	pause: PAUSE,
};

describe('LissajousLoader', () => {
	beforeAll(() => {
		requestAnimationFrameMock = jest.spyOn(window, 'requestAnimationFrame')
			.mockImplementation((callback: FrameRequestCallback) => {
				return setTimeout(callback, 16);
			});

		cancelAnimationFrameMock = jest.spyOn(window, 'cancelAnimationFrame')
			.mockImplementation((requestId: number) => {
				return clearTimeout(requestId);
			});
	});

	beforeEach(() => {
		jest.useFakeTimers();

		canvas = document.createElement('canvas');
		canvas.width = 60;
		canvas.height = 60;
	});

	afterEach(() => {
		requestAnimationFrameMock.mockClear();
		cancelAnimationFrameMock.mockClear();
	});

	it('should render nothing without start() called', () => {
		new LissajousLoader(canvas, defaultProps);

		jest.runAllTimers();
		expect(canvas).toMatchSnapshot();
	});

	it('should render the whole figure after half a cycle', () => {
		const loader = new LissajousLoader(canvas, defaultProps);
		loader.start();

		jest.advanceTimersByTime(DRAWING_ITERATIONS_COUNT * RAF_TIMEOUT);
		expect(canvas).toMatchSnapshot();
	});

	it('should clear a figure after full cycle (+ pause)', () => {
		const loader = new LissajousLoader(canvas, defaultProps);
		loader.start();

		jest.advanceTimersByTime(FULL_CYCLE_ITERATIONS_COUNT * RAF_TIMEOUT + PAUSE);
		expect(canvas).toMatchSnapshot();
	});

	it.skip('should take a pause when rendered the whole figure', () => {
		const loader = new LissajousLoader(canvas, defaultProps);
		loader.start();

		jest.advanceTimersByTime(DRAWING_ITERATIONS_COUNT * RAF_TIMEOUT);
		// expect(canvas).toMatchSnapshot();

		requestAnimationFrameMock.mockReset();
		expect(requestAnimationFrameMock).not.toBeCalled();

		jest.advanceTimersByTime(PAUSE);
		expect(requestAnimationFrameMock).not.toBeCalled();

		jest.advanceTimersByTime(RAF_TIMEOUT);
		expect(requestAnimationFrameMock).toBeCalledTimes(1);

		jest.advanceTimersByTime(10 * RAF_TIMEOUT);

		expect(canvas).toMatchSnapshot();
	});
});