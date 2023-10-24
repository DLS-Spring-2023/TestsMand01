import { Gender } from '../../enums/Gender';
import { generateCpr, generateDob, generateFullNameAndGender } from '../../generator';
import { FullNameAndGender } from '../../models';

export const fakeCprFullNameGenderAndDateOfBirth = (): FullNameAndGender & {
	cpr: string;
	dob: Date;
} => {
	const fakeFullNameAndGender = generateFullNameAndGender();
	const dob = generateDob();
	const gender = fakeFullNameAndGender.gender === Gender.Male ? Gender.Male : Gender.Female;
	const cpr = generateCpr(dob, gender);

	return {
		...fakeFullNameAndGender,
		cpr: cpr,
		dob: dob,
	};
};
