import { range } from '../src/utils';

describe('Range helper tests', () => {
	it('Kek', () => {
		const actual: number[] = range(0, 2, 1);
		expect(actual).toStrictEqual([0, 1, 2]);
	})
});
