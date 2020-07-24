import {toBeDeepCloseTo,toMatchCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo, toMatchCloseTo});

import { range } from '../src/utils';

describe('Range helper', () => {
	it('should work with integer boundaries and step = 1', () => {
		const actual: number[] = range(0, 9, 1);
		expect(actual).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	});

	it('should work with integer boundaries and step > 1', () => {
		const actual: number[] = range(0, 9, 3);
		expect(actual).toStrictEqual([0, 3, 6, 9]);
	});

	it('should work with integer boundaries and step that overflows the upper boundary', () => {
		const actual: number[] = range(0, 4, 5);
		expect(actual).toStrictEqual([0]);
	});

	it('should work with integer boundaries and float step', () => {
		const actual: number[] = range(0, 2, 0.5);
		expect(actual).toStrictEqual([0, 0.5, 1, 1.5, 2]);
	});

	it('should work with integer boundaries and float step that overflows the upper boundary', () => {
		const actual: number[] = range(0, 5, 5.5);
		expect(actual).toStrictEqual([0]);
	});

	it('should work with float boundaries and float step', () => {
		const actual: number[] = range(0.1, 0.9, 0.1);

		// @ts-ignore
		expect(actual).toBeDeepCloseTo([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
	});

	it('should work with float boundaries and float step that overflows the upper boundary', () => {
		const actual: number[] = range(0.01, 0.05, 0.1);
		expect(actual).toStrictEqual([0.01]);
	});

	it('should generate predictable amount of numbers', () => {
		const from = 1;
		const to = 2 * Math.PI;
		const step = 0.05;
		const actual: number[] = range(from, to, step);

		expect(actual).toHaveLength(Math.ceil((to - from) / step));
	});
});
