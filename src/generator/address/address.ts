import { Address } from "../../models";
import Repo from "../../repo/Repo";

generateAddress(5).then(console.log);

export async function generateAddress(n: number = 1): Promise<Address[]> {
    if (n < 1) n = 1;
    
    const street = await Repo.getRandomFromStreetName(n);
    const number = generateStreetNumber();
    const floor = generateFloor();
    const door = generateDoor();
    const postalCodes = await Repo.getRandomFromPostalCode(n);
    
    let addresses: Address[] = [];
    for (let i = 0; i < n; i++) {
        addresses.push({
            street: street[i],
            number,
            floor,
            door,
            zip: postalCodes[i].zip,
            city: postalCodes[i].city,
        });
    }

    return addresses;
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