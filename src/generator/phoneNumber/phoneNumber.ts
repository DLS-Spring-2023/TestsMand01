import { phoneNumberStarer } from './phoneNumberStarter.const';

export const generatePhoneNumber = (): number => {
	let generatedPhoneNumber = 0;

	const starter = phoneNumberStarer[Math.floor(Math.random() * phoneNumberStarer.length)];

	const digits = 8 - starter.length;

	const minNumber = Math.pow(10, digits - 1);
	const maxNumber = Math.pow(10, digits) - 1;

	const restOfTheNumber = (
		Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
	).toString();

	generatedPhoneNumber = parseInt(starter + restOfTheNumber);

	return generatedPhoneNumber;
};
