import { Person } from '../../models';
import * as g from '../../generator';
import { logPerson } from '../../models/Person';

export const fakePerson = async (): Promise<Person> => {
	const person = await generateFakePeople(1);
	logPerson(person[0]);
	return person[0];
};

export const fakePeople = async (quantity: string): Promise<Person[]> => {
	const n = parseInt(quantity);

	if (isNaN(n)) {
		console.log(`Quantity "${n}" is not a number.`);
		process.exit(1);
	}

	if (n < 2 || n > 100) {
		console.log(`Invalid quantity! Must be a number between 2 and 100.`);
		process.exit(1);
	}

	const now = performance.now();
	const people = await generateFakePeople(n);
	for (const person of people) {
		logPerson(person);
	}
	const time = performance.now() - now;

	console.log('\nGenerated', n, 'fake people in', Math.floor(time / 10) / 100, 'seconds.');

	return people;
};

const generateFakePeople = async (n: number = 1): Promise<Person[]> => {
	if (n < 1) n = 1;

	const people: Person[] = [];
	const addresses = await g.generateAddress(n);

	for (const address of addresses) {
		const cpr = g.generateCpr();
		const dob = g.generateDob();
		const { name, surname, gender } = g.generateFullNameAndGender();
		const phone = g.generatePhoneNumber();
		people.push({
			cpr,
			dob,
			fullName: `${name} ${surname}`,
			gender,
			phone,
			address: address,
		});
	}

	return people;
};
