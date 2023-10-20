import { Gender } from '../enums/Gender';

export type FullNameAndGender = {
	name: string;
	surname: string;
	gender: Gender | 'female' | 'male';
};
