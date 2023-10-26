import { fakePeople, fakePerson } from './fake-people';

describe('fakePeople', () => {
	it('should generate a new person with no missing properties', async () => {
		const person = await fakePerson();

		expect(person.cpr).toBeDefined();
		expect(person.fullName).toBeDefined();
		expect(person.dob).toBeDefined();
		expect(person.gender).toBeDefined();
		expect(person.phone).toBeDefined();
		expect(person.address).toBeDefined();
		expect(person.address.street).toBeDefined();
		expect(person.address.number).toBeDefined();
		expect(person.address.floor).toBeDefined();
		expect(person.address.door).toBeDefined();
		expect(person.address.zip).toBeDefined();
		expect(person.address.city).toBeDefined();
	});

	it.each([
		// invalid lower bound
		['-1'],
		['0'],
		['1'],
		// invalid upper bound
		['101'],
		['102'],
		['103'],
	])('should exit with 1', async (n: unknown) => {
		const mockExit = jest.spyOn(process, 'exit').mockImplementation();
		await fakePeople(n as string);
		expect(mockExit).toHaveBeenCalledWith(1);
		mockExit.mockRestore();
	});

	it.each([
		// valid lower bound
		['2', 2],
		['3', 3],
		['4', 4],
		// valid middle
		['49', 49],
		['50', 50],
		['51', 51],
		// valid upper bound
		['98', 98],
		['99', 99],
		['100', 100],
		// other valid values
		['2abc', 2], // valid because parseInt('2abc') === 2 in JavaScript
		['100.9', 100], // valid because parseInt('100.9') === 100 in JavaScript
	])('should generate % unique people', async (n, expected) => {
		const people = await fakePeople(n);
		const uniquePeople = new Set(people.map((p) => JSON.stringify(p)));
		expect(uniquePeople.size).toBe(expected);
	});
});
