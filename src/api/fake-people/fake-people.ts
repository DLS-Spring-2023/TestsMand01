import { Person } from '../../models';
import * as g from '../../generator';

export const fakePeople = async (n: number = 1): Promise<Person[]> => {
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
