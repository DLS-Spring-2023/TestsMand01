import { Api } from './api/Api';
import { GeneratorMethod } from './enums/GeneratorMethod';

const api = new Api();

const generationMethod = process.argv[2];
// TODO: use this for bulk generation
// const quantity = process.argv[3];

switch (generationMethod) {
	case GeneratorMethod.FAKE_MOBILE_PHONE_NUMBER: {
		console.log(api.fakeMobilePhoneNumber());
		break;
	}
	default: {
		console.log('Specified generation method does not exist.');
		break;
	}
}
