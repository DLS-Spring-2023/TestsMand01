import { Gender } from '../enums/Gender';
import { Address } from './Address';

export type Person = {
	cpr: string;
	fullName: string;
	gender: Gender | 'male' | 'female';
	dob: Date;
	address: Address;
	phone: number;
};

export function logPerson(person: Person) {
	console.log('');
	console.log('CPR:      ', person.cpr);
	console.log('Name:     ', person.fullName);
	console.log('Gender    ', Gender[person.gender as number]);
	console.log('Birthday: ', person.dob.toLocaleDateString());
	console.log('Address:  ', person.address.street, person.address.number);
	console.log('Floor:    ', person.address.floor);
	console.log('Door:     ', person.address.door);
	console.log('Zip code: ', person.address.zip.toString());
	console.log('City:     ', person.address.city);
}
