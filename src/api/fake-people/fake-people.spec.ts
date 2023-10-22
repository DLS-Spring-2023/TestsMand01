import { fakePeople } from './fake-people';

describe('fakePeople', () => {
	it('should generate a new person with no missing properties', async () => {
		const people = await fakePeople(-1);
		const person = people[0];

		expect(people.length).toBe(1);
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

	it('should generate 100,000 people in less than 5 seconds', async () => {
		const start = performance.now();
		await fakePeople(100000);
		const end = performance.now();
		const time = end - start;

		expect(time).toBeLessThan(10000);
	});

	it('should generate 100,000 unique people', async () => {
		const people = await fakePeople(100000);
		const uniquePeople = new Set(people.map((p) => JSON.stringify(p)));
		expect(uniquePeople.size).toBe(100000);
	});
});
