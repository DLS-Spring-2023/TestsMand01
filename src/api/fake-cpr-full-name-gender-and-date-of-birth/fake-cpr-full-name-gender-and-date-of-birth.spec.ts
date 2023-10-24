import { Gender } from '../../enums/Gender';
import { fakeCprFullNameGenderAndDateOfBirth } from './fake-cpr-full-name-gender-and-date-of-birth';

describe('fakeCprFullNameGenderAndDateOfBirth', () => {
	it('should return the  cpr, full name and gender', () => {
		const result = fakeCprFullNameGenderAndDateOfBirth();
		const genders = [Gender.Female, Gender.Male];

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(result).toHaveProperty('gender');
		expect(result).toHaveProperty('cpr');

		expect(result.dob).toBeInstanceOf(Date);
		
		expect(genders).toContain(result.gender)
		expect(result.name).not.toBeNull();
		expect(result.surname).not.toBeNull();
		expect(result.cpr.length).toBe(10)
	});
});
