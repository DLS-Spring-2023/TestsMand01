import { Address } from './Address';

export type Person = {
	cpr: string;
	fullName: string;
	dob: Date;
	address: Address;
	phone: number;
};
