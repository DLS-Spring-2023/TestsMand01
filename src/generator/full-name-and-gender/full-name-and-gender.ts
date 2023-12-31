// import { persons } from "../../data/person-names.json";
// Sometimes it will load the import, sometimes it wont, i've tried looking into encoding problems, ways of importing json files, but nothing seems to work
import { readFileSync } from 'fs';
import { FullNameAndGender } from '../../models';
import { Gender } from '../../enums/Gender';

const json = readFileSync('./src/data/person-names.json', 'utf8');
const { persons } = JSON.parse(json);

export const generateFullNameAndGender = (): FullNameAndGender => {
	const mindIndex = 0;
	const maxIndex = persons.length - 1;
	const randomIndex = Math.floor(Math.random() * (maxIndex - mindIndex + 1)) + mindIndex;

	const fullNameAndGender: FullNameAndGender = {
		...persons[randomIndex],
		// Since we dont explicitally assign the enum to a string value and the json file has it as this string value, we need to add this check and assign
		gender: persons[randomIndex].gender === 'male' ? Gender.Male : Gender.Female,
	};

	return fullNameAndGender;
};
