import { generatePhoneNumber } from './phoneNumber';
import { phoneNumberStarer } from './phoneNumberStarter.const';

describe('generatePhoneNumber', () => {
	for (let i = 1; i <= 10; i++) {
		it('should generate a random phone number', () => {
			const generatedPhoneNumber = generatePhoneNumber();

			expect(generatedPhoneNumber.toString().length).toEqual(8);
		});

		it('should start with one of the following values', () => {
			const generatedPhoneNumber = generatePhoneNumber().toString();

			const startsWithMatch = phoneNumberStarer.some((starter) =>
				generatedPhoneNumber.startsWith(starter.toString()),
			);

			expect(startsWithMatch).toBeTruthy();
		});
	}
});
