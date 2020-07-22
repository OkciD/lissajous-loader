// @ts-ignore
import canvasSerializer from 'jest-canvas-snapshot-serializer';

expect.addSnapshotSerializer(canvasSerializer);

let requestAnimationFrameMock: jest.SpyInstance;
let cancelAnimationFrameMock: jest.SpyInstance;

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
	});

	it('raf test 1', () => {
		let lol = 4

		window.requestAnimationFrame(() => {
			lol += 5;
		});

		jest.advanceTimersByTime(5);
		expect(lol).toStrictEqual(4);

		jest.advanceTimersByTime(20);
		expect(lol).toStrictEqual(9);
	});

	it('raf test 2', () => {
		let lol = 4

		const requestId = window.requestAnimationFrame(() => {
			lol += 5;
		});
		jest.advanceTimersByTime(5);
		window.cancelAnimationFrame(requestId);

		jest.runAllTimers();
		expect(lol).toStrictEqual(4);
	});

	it('canvas test', () => {
		const canvas = document.createElement('canvas');

		canvas.width = 50;
		canvas.height = 50;

		const context = canvas.getContext('2d')!;
		context.moveTo(0, 0);
		context.lineTo(20, 20);
		context.stroke();

		expect(canvas).toMatchSnapshot();
	});

	afterEach(() => {
		requestAnimationFrameMock.mockRestore();
		cancelAnimationFrameMock.mockRestore();
	});
});
