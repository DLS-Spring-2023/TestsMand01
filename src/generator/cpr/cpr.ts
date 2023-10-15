import { Gender } from "../../enums/Gender"
import { generateDob } from "../dob/dob"

export const generateCpr = (
    dob: Date = generateDob(),
    gender?: Gender
): string => {
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = String(dob.getFullYear()).slice(2);

    return `${day}${month}${year}${generateRandomDigits(3)}${gender === Gender.Male ? getRandomOddNumber() : getRandomEvenNumber()}`;
}

const generateRandomDigits = (count: number) => {
    let generatedDigits = '';

    for (let i = 0; i < count; i++) {
        const digit = Math.floor(Math.random() * 10);
        generatedDigits += digit
    }

    return generatedDigits;
}

const getRandomOddNumber = () => {
    const ODD_NUMBERS = [1, 3, 5, 7, 9];

    return ODD_NUMBERS[Math.floor(Math.random() * ODD_NUMBERS.length)]
}

const getRandomEvenNumber = () => {
    const EVEN_NUMBERS = [0, 2, 4, 6, 8];

    return EVEN_NUMBERS[Math.floor(Math.random() * EVEN_NUMBERS.length)]
}
