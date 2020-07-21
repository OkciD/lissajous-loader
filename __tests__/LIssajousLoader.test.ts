let requestAnimationFrameMock: jest.SpyInstance;
let cancelAnimationFrameMock: jest.SpyInstance;

describe('LissajousLoader', () => {
	beforeEach(() => {
		requestAnimationFrameMock = jest.spyOn(window, 'requestAnimationFrame')
			.mockImplementation((callback: FrameRequestCallback) => {
				return setTimeout(callback, 0);
			});

		cancelAnimationFrameMock = jest.spyOn(window, 'cancelAnimationFrame')
			.mockImplementation((requestId: number) => {
				return clearTimeout(requestId);
			});

		jest.useFakeTimers()
	});

	it('test test', () => {
		let lol = 4

		window.requestAnimationFrame(() => {
			lol += 5;
		});
		jest.runAllTimers();

		expect(lol).toStrictEqual(9);
	});

	afterEach(() => {
		requestAnimationFrameMock.mockRestore();
		cancelAnimationFrameMock.mockRestore();
	});
});
