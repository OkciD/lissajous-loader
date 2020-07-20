export function range(from: number, to: number, step: number): number[] {
	let current = from;
	const result: number[] = [];

	while (current < to) {
		result.push(current);
		current += step;
	}

	if (to - result[result.length - 1] <= step) {
		result.push(to);
	}

	return result;
}
