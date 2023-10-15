import { Address, FullNameAndGender, Person } from "../models";

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


class Api implements IApi {
    fakeCpr(): string {
        return "not implemented"
    };
    fakeFullNameAndGender(): FullNameAndGender {
        return {} as FullNameAndGender;
    };
    fakeFullNameGenderAndDateOfBirth(): FullNameAndGender & { dob: number } {
        return {} as FullNameAndGender & { dob: number }
    };
    fakeCprFullNameAndGender(): FullNameAndGender & { cpr: string } {
        return {} as FullNameAndGender & { cpr: string }
    };
    fakeCprFullNameGenderAndDateOfBirth(): FullNameAndGender & { cpr: string; dob: number } {
        return {} as FullNameAndGender & { cpr: string; dob: number }
    };
    fakeAddress(): Address {
        return {} as Address;
    };
    fakeMobilePhoneNumber(): string {
        return "not implemented"
    };
    fakePerson(): Person {
        return {} as Person
    };
}