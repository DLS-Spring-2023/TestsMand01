import { Gender } from '../../enums/Gender';
import { generateCpr, generateDob, generateFullNameAndGender } from '../../generator';
import { FullNameAndGender } from '../../models';

export const fakeCprFullNameAndGender = (): FullNameAndGender & { cpr: string } => {
	const fakeFullNameAndGender = generateFullNameAndGender();
	const dob = generateDob();
	const gender = fakeFullNameAndGender.gender === Gender.Male ? Gender.Male : Gender.Female;
	const cpr = generateCpr(dob, gender)

	return {
		...fakeFullNameAndGender,
		cpr: cpr,
	};
};