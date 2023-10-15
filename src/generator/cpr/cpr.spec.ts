import { Gender } from "../../enums/Gender";
import { generateCpr } from "./cpr"

const CPR_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}\d{4}$/
const FEMALE_CPR_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}\d{3}[02468]$/
const MALE_CPR_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}\d{3}[13579]$/

describe('generateCpr', () => {
    it('should generate random valid CPR', () => {
        const generatedCpr = generateCpr();

        expect(generatedCpr).toMatch(CPR_REGEX)
    });

    it('should generate random valid male CPR', () => {
        const generatedCpr = generateCpr(new Date(), Gender.Male);

        expect(generatedCpr).toMatch(MALE_CPR_REGEX)
    });

    it('should generate random valid male CPR', () => {
        const generatedCpr = generateCpr(new Date(), Gender.Female);

        expect(generatedCpr).toMatch(FEMALE_CPR_REGEX)
    });

    it.each([
        [new Date(2009, 10, 8), /^081109/], // 11 because JS is 0 based
        [new Date(2000, 1, 1), /^010200/],
        [new Date(1999, 9, 10), /^101099/],
    ])("should start with specified date '%s'", (date, startingRegex) => {
        const generatedCpr = generateCpr(date);

        expect(generatedCpr).toMatch(startingRegex)
    });
});