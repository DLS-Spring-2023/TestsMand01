import { Gender } from '../../enums/Gender';
import { generateFullNameAndGender } from './full-name-and-gender';

describe('generateFullNameAndGender', () => {
	it('should return a random full name and gender', () => {
		const validGenders = [Gender.Female, Gender.Male];
		const result = generateFullNameAndGender();

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(validGenders).toContain(result.gender);

		expect(result.name).not.toBeNull();
		expect(result.surname).not.toBeNull();
	});
});
