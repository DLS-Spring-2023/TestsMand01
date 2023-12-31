import { Address } from '../../models';
import { generateAddress } from './address';

let addresses: Address[] = [];

describe('generate random address', () => {
	beforeAll(async () => {
		// Generate 50,000 addresses
		// NOTE: The database sdk is mocked (see __mocks__/surrealdb.node.ts)
		addresses = await generateAddress(50000);
	});

	it('should generate a random street number', async () => {
		// Street number rules:
		// A number between 1 and 999 and (optional) a letter between A and Z
		for (const address of addresses) {
			expect(address.number).toMatch(/^[1-9][0-9]?[0-9]?[A-Z]?$/);
		}
	});

	it('should generate a random floor', async () => {
		// Floor rules:
		// 1. st
		// 2. random number between 1 and 99
		for (const address of addresses) {
			expect(address.floor).toMatch(/^(st|[1-9][0-9]?)$/);
		}
	});

	it('should generate a random door name', async () => {
		// Door name rules:
		// 1. tv, th or mf
		// 2. random number between 1 and 50
		// 3. random lowercase letter between a and z and (optional) random number between 1 and 999
		for (const address of addresses) {
			expect(address.door).toMatch(
				/^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/,
			);
		}
	});

	it('should generate less than zero duplicate street names in a set of 50,000', () => {
		// There are around 53,000 street names in the dataset.
		// Duplicates should not happen before that threshold.
		const uniqueStreets = new Set(addresses.map((a) => JSON.stringify(a.street)));
		expect(uniqueStreets.size).toBe(50000);
	});

	it('should generate 0% duplicate addresses', () => {
		// The chance of generating a duplicate address is very small.
		// This test is here to make sure that the chance is not too big.
		const uniqueCities = new Set(addresses.map((a) => JSON.stringify(a)));
		expect(uniqueCities.size).toBe(addresses.length);
	});

	// White box test (to increase statement coverage)
	it('should generate 1 address with a negative argument', async () => {
		const address = await generateAddress(-1);
		expect(address.length).toBe(1);
	});

	it('should generate over 60000 addresses that are unique', async () => {
		const address = await generateAddress(60000);
		const uniqueCities = new Set(address.map((a) => JSON.stringify(a)));
		expect(uniqueCities.size).toBe(address.length);
	});
});
