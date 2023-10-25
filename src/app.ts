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
	case GeneratorMethod.FAKE_FULL_NAME_AND_GENDER: {
		const fakeFullNameAndGender = api.fakeFullNameAndGender();
		console.log(fakeFullNameAndGender);
		break;
	}
	case GeneratorMethod.FAKE_FULL_NAME_GENDER_AND_DATE_OF_BIRTH: {
		const fakeFullNameGenderAndDateOfBirth = api.fakeFullNameGenderAndDateOfBirth();
		console.log(fakeFullNameGenderAndDateOfBirth);
		break;
	}
	case GeneratorMethod.FAKE_CPR_FULL_NAME_AND_GENDER: {
		const fakeCprFullNameAndGender = api.fakeCprFullNameAndGender();
		console.log(fakeCprFullNameAndGender);
		break;
	}
	case GeneratorMethod.FAKE_CPR_FULL_NAME_GENDER_AND_DATE_OF_BIRTH: {
		const fakeCprFullNameGenderAndDateOfBirth = api.fakeCprFullNameGenderAndDateOfBirth();
		console.log(fakeCprFullNameGenderAndDateOfBirth);
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
	case GeneratorMethod.FAKE_CPR: {
		const fakeCpr = api.fakeCpr();
		console.log(fakeCpr);
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
