import { generatePhoneNumber } from '../generator/phoneNumber/phoneNumber';
import { Address, FullNameAndGender, Person } from '../models';

export interface IApi {
	fakeCpr: () => string;
	fakeFullNameAndGender: () => FullNameAndGender;
	fakeFullNameGenderAndDateOfBirth: () => FullNameAndGender & { dob: number };
	fakeCprFullNameAndGender: () => FullNameAndGender & { cpr: string };
	fakeCprFullNameGenderAndDateOfBirth: () => FullNameAndGender & { cpr: string; dob: number };
	fakeAddress: () => Address;
	fakeMobilePhoneNumber: () => string;
	fakePerson: () => Person;
}

export class Api implements IApi {
	fakeCpr(): string {
		return 'not implemented';
	}
	fakeFullNameAndGender(): FullNameAndGender {
		return {} as FullNameAndGender;
	}
	fakeFullNameGenderAndDateOfBirth(): FullNameAndGender & { dob: number } {
		return {} as FullNameAndGender & { dob: number };
	}
	fakeCprFullNameAndGender(): FullNameAndGender & { cpr: string } {
		return {} as FullNameAndGender & { cpr: string };
	}
	fakeCprFullNameGenderAndDateOfBirth(): FullNameAndGender & { cpr: string; dob: number } {
		return {} as FullNameAndGender & { cpr: string; dob: number };
	}
	fakeAddress(): Address {
		//TODO: do this
		return {} as Address;
	}
	fakeMobilePhoneNumber(): string {
		return generatePhoneNumber().toString();
	}
	fakePerson(): Person {
		return {} as Person;
	}
}
