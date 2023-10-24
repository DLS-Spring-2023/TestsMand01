import { fakeFullNameGenderAndDateOfBirth } from './fake-full-name-gender-and-date-of-birth';

describe('fakeFullNameGenderAndDateOfBirth', () => {
	it('should return the full name, gender and date of birth', () => {
		const validGenders = ['male', 'female'];
		const result = fakeFullNameGenderAndDateOfBirth();

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(result).toHaveProperty('gender');
		expect(result).toHaveProperty('dob');

		expect(validGenders).toContain(result.gender);
		expect(result.dob).toBeInstanceOf(Date);
	});
});
