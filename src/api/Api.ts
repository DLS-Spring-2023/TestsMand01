import {
	generateAddress,
	generateCpr,
	generateFullNameAndGender,
	generatePhoneNumber,
} from '../generator';
import { Address, FullNameAndGender, Person } from '../models';
import { fakeFullNameGenderAndDateOfBirth } from '../api/fake-full-name-and-date-of-birth/fake-full-name-gender-and-date-of-birth';
import { fakeCprFullNameAndGender } from './fake-cpr-full-name-and-gender/fake-cpr-full-name-and-gender';
import { fakeCprFullNameGenderAndDateOfBirth } from './fake-cpr-full-name-gender-and-date-of-birth/fake-cpr-full-name-gender-and-date-of-birth';

export interface IApi {
	fakeCpr: () => string;
	fakeFullNameAndGender: () => FullNameAndGender;
	fakeFullNameGenderAndDateOfBirth: () => FullNameAndGender & { dob: Date };
	fakeCprFullNameAndGender: () => FullNameAndGender & { cpr: string };
	fakeCprFullNameGenderAndDateOfBirth: () => FullNameAndGender & { cpr: string; dob: Date };
	fakeAddress: () => Promise<Address[]>;
	fakeMobilePhoneNumber: () => string;
	fakePerson: () => Person;
}

export class Api implements IApi {
	fakeCpr(): string {
		return generateCpr();
	}
	fakeFullNameAndGender(): FullNameAndGender {
		return generateFullNameAndGender();
	}
	fakeFullNameGenderAndDateOfBirth(): FullNameAndGender & { dob: Date } {
		return fakeFullNameGenderAndDateOfBirth();
	}
	fakeCprFullNameAndGender(): FullNameAndGender & { cpr: string } {
		return fakeCprFullNameAndGender();
	}
	fakeCprFullNameGenderAndDateOfBirth(): FullNameAndGender & { cpr: string; dob: Date } {
		return fakeCprFullNameGenderAndDateOfBirth();
	}
	async fakeAddress(): Promise<Address[]> {
		return await generateAddress();
	}
	fakeMobilePhoneNumber(): string {
		return generatePhoneNumber().toString();
	}
	fakePerson(): Person {
		return {} as Person;
	}
}
