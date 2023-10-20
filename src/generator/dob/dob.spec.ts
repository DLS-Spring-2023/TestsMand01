import { generateDob, MAX_YEARS_AGO } from './dob';

describe('generate random date of birth', () => {
	it(`should generate random dob no older than ${MAX_YEARS_AGO} years`, () => {
		const maxAgeDate = new Date();
		maxAgeDate.setFullYear(maxAgeDate.getFullYear() - MAX_YEARS_AGO);

		const generatedDob = generateDob();

		expect(generatedDob).toBeInstanceOf(Date);
		expect(generatedDob.getTime()).toBeGreaterThanOrEqual(maxAgeDate.getTime());
	});

	it('should generate random dob that is in the past', () => {
		const now = new Date();

		const generatedDob = generateDob();

		expect(generatedDob).toBeInstanceOf(Date);
		expect(generatedDob.getTime()).toBeLessThan(now.getTime());
	});
});
