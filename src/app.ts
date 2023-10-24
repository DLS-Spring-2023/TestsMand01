import { Api } from './api/Api';
import { fakePeople, fakePerson } from './api/fake-people/fake-people';
import { GeneratorMethod } from './enums/GeneratorMethod';

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
		fakePerson();
		break;
	}
	case GeneratorMethod.FAKE_PEOPLE: {
		fakePeople(quantity);
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
