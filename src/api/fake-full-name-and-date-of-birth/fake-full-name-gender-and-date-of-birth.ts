import { Gender } from '../../enums/Gender';
import { generateDob, generateFullNameAndGender } from '../../generator';
import { FullNameAndGender } from '../../models';

export const fakeFullNameGenderAndDateOfBirth = (): FullNameAndGender & { dob: Date } => {
	const fakeFullNameAndGender = generateFullNameAndGender();
	const dob = generateDob();

	return {
		...fakeFullNameAndGender,
		gender: Gender.Male ? 'male' : 'female',
		dob: dob,
	};
};
