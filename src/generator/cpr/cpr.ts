import { Gender } from "../../enums/Gender"

export const generateCpr = (
    dob?: Date,
    gender?: Gender
): string => {
    if (!dob && !gender) {
        return "simone"
    }
    return "simone"
}