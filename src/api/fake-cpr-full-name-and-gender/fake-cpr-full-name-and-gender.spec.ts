import { fakeCprFullNameAndGender } from './fake-cpr-full-name-and-gender';
import { Gender } from '../../enums/Gender';

describe('fakeCprFullNameAndGender', () => {
	it('should return the  cpr, full name and gender', () => {
		const validGenders = [Gender.Female, Gender.Male];
		const result = fakeCprFullNameAndGender();

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(result).toHaveProperty('gender');
		expect(result).toHaveProperty('cpr');
		expect(validGenders).toContain(result.gender)
		expect(result.name).not.toBeNull();
		expect(result.surname).not.toBeNull();
		expect(result.cpr.length).toBe(10)

		
	});
});
