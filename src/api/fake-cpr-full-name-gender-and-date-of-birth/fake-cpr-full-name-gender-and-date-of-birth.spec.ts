import { fakeCprFullNameGenderAndDateOfBirth } from './fake-cpr-full-name-gender-and-date-of-birth';

describe('fakeCprFullNameGenderAndDateOfBirth', () => {
	it('should return the  cpr, full name and gender', () => {
		const result = fakeCprFullNameGenderAndDateOfBirth();

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(result).toHaveProperty('gender');
		expect(result).toHaveProperty('cpr');
		expect(result.dob).toBeInstanceOf(Date);
	});
});
