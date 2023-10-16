import { Address } from "../../models";
import Repo from "../../repo/Repo";

export async function generateAddress(): Promise<Address> {
    const street = await Repo.getRandomFromStreetName();
    const number = generateStreetNumber();
    const floor = generateFloor();
    const door = generateDoor();
    const { zip, city } = await Repo.getRandomFromPostalCode();
    
    return {
        street,
        number,
        floor,
        door,
        zip,
        city,
    }
}

function generateStreetNumber(): string {
    // Random door number between 1 and 999
    const door = Math.floor(Math.random() * 999) + 1;

    // Random door letter between A and Z (50% chance)
    const hasLetter = Math.random() > 0.5;
    const letter = hasLetter ? String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase() : "";
    
    return door + letter;
}

function generateFloor(): string {
    // Random floor number from st or 1-99
    let floor = Math.floor(Math.random() * 100).toString();
    if (floor === '0') floor = "st";

    return floor;
}

function generateDoor(): string {
    const type = Math.floor(Math.random() * 3) + 1;
    switch (type) {
        case 1:
            const doors = ['tv', 'mf', 'th'];
            return doors[Math.floor(Math.random() * doors.length)];
        case 2:
            return (Math.floor(Math.random() * 50) + 1).toString();
        case 3:
            const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)).toLowerCase();
            const hasNum = Math.random() > 0.5;
            const num = hasNum ? "-" + (Math.floor(Math.random() * 999) + 1) : "";
            return letter + num;
        default:
            throw new Error("Invalid door type");
    }
}