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
		expect(lol).toStrictEqual(5);
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

	afterEach(() => {
		requestAnimationFrameMock.mockRestore();
		cancelAnimationFrameMock.mockRestore();
	});
});
