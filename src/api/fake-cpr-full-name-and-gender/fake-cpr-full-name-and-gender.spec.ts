import { fakeCprFullNameAndGender } from "./fake-cpr-full-name-and-gender";

describe('fakeCprFullNameAndGender', () => {
	it('should return the  cpr, full name and gender', () => {
		const result = fakeCprFullNameAndGender();

		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('surname');
		expect(result).toHaveProperty('gender');
		expect(result).toHaveProperty('cpr');
	});
});
