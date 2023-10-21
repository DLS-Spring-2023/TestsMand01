import { generateAddress, generatePhoneNumber } from '../generator';
import { Address, FullNameAndGender, Person } from '../models';

export interface IApi {
	fakeCpr: () => string;
	fakeFullNameAndGender: () => FullNameAndGender;
	fakeFullNameGenderAndDateOfBirth: () => FullNameAndGender & { dob: number };
	fakeCprFullNameAndGender: () => FullNameAndGender & { cpr: string };
	fakeCprFullNameGenderAndDateOfBirth: () => FullNameAndGender & { cpr: string; dob: number };
	fakeAddress: () => Promise<Address[]>;
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
