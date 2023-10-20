import { generateFullNameAndGender } from "../../generator";
import { FullNameAndGender } from "../../models";

export const fakeFullNameAndGender = (): FullNameAndGender => {
 return generateFullNameAndGender()
}