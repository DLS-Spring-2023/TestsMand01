import { Api } from './api/Api';
import { fakePeople } from './api/fake-people/fake-people';
import { GeneratorMethod } from './enums/GeneratorMethod';
import { logPerson } from './models/Person';

const api = new Api();

const generationMethod = process.argv[2];
const quantity = process.argv[3];

switch (generationMethod) {
	case GeneratorMethod.FAKE_MOBILE_PHONE_NUMBER: {
		const fakeMobilePhoneNumber = api.fakeMobilePhoneNumber();
		console.log(fakeMobilePhoneNumber);
		break;
	}
	case GeneratorMethod.FAKE_ADDRESS: {
		const fakeAddress = await api.fakeAddress();
		console.log(fakeAddress);
		break;
	}
	case GeneratorMethod.FAKE_PERSON: {
		const person = await fakePeople(1);
		logPerson(person[0]);
		break;
	}
	case GeneratorMethod.FAKE_PEOPLE: {
		const n = parseInt(quantity);
		if (isNaN(n)) {
			console.log(`Quantity "${quantity}" is not a number.`);
			process.exit(1);
		}
		const now = performance.now();
		const people = await fakePeople(n);
		for (const person of people) {
			logPerson(person);
		}
		const time = performance.now() - now;

		console.log('\nGenerated', n, 'fake people in', Math.floor(time / 10) / 100, 'seconds.');
		break;
	}
	default: {
		console.log(`Specified generation "${generationMethod}" method does not exist.`);
		console.log('Available generation methods are:');
		for (const method of Object.values(GeneratorMethod)) {
			let arg = method.toString();
			if (method === GeneratorMethod.FAKE_PEOPLE) arg += ' <quantity>';
			console.log(' -', arg);
		}
		process.exit(1);
	}
}
