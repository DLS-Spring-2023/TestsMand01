import { Address } from '../../models';
import Repo from '../../repo/Repo';

export async function generateAddress(n: number = 1): Promise<Address[]> {
	if (n < 1) n = 1;

	const addressData = await Repo.getRandomAddressData(n);

	return addressData.map((a) => {
		const postalData = a.postal_codes[Math.floor(Math.random() * a.postal_codes.length)];
		return {
			street: a.name,
			number: generateStreetNumber(),
			floor: generateFloor(),
			door: generateDoor(),
			zip: postalData.code,
			city: postalData.city,
		};
	});
}

function generateStreetNumber(): string {
	// Random door number between 1 and 999
	const door = Math.floor(Math.random() * 999) + 1;

	// Random door letter between A and Z (50% chance)
	const hasLetter = Math.random() > 0.5;
	const letter = hasLetter
		? String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase()
		: '';

	return door + letter;
}

function generateFloor(): string {
	// Random floor number from st or 1-99
	let floor = Math.floor(Math.random() * 100).toString();
	if (floor === '0') floor = 'st';

	return floor;
}

function generateDoor(): string {
	const type = Math.floor(Math.random() * 3) + 1;
	const doors = ['tv', 'mf', 'th'];
	const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)).toLowerCase();
	const hasNum = Math.random() > 0.5;
	const num = hasNum ? '-' + (Math.floor(Math.random() * 999) + 1) : '';

	switch (type) {
		case 1:
			return doors[Math.floor(Math.random() * doors.length)];
		case 2:
			return (Math.floor(Math.random() * 50) + 1).toString();
		case 3:
			return letter + num;
		default:
			throw new Error('Invalid door type');
	}
}
