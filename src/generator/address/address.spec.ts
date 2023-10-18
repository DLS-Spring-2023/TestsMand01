import { Address } from "../../models";
import Repo from "../../repo/Repo";
import { generateAddress } from "./address";

let addresses: Address[];

describe('generate random address', () => {

    beforeAll(async () => {
        // Generate 5000 addresses (takes about 15-20 seconds.)
        // In production the limit should probably be 100 or so.
        addresses = await generateAddress(5000);
    }, 60000);

    it(`should generate a random street name from the database`, async () => {
        const allAddresses = await Repo.findStreetNames();
        for (const address of addresses) {
            expect(allAddresses).toContain(address.street);
        }
    });

    it('should generate a random street number', async () => {
        // Street number rules:
        // A number between 1 and 999 and (optional) a letter between A and Z
        for (const address of addresses) {
            expect(address.number).toMatch(/^[1-9][0-9]?[0-9]?[A-Z]?$/);
        }
    });

    it('should generate a random floor', async () => {
        // Floor rules:
        // 1. st
        // 2. random number between 1 and 99
        for (const address of addresses) {
            expect(address.floor).toMatch(/^(st|[1-9][0-9]?)$/);
        }
    });

    it('should generate a random door name', async () => {
        // Door name rules:
        // 1. tv, th or mf
        // 2. random number between 1 and 50
        // 3. random lowercase letter between a and z and (optional) random number between 1 and 999
        for (const address of addresses) {
            expect(address.door).toMatch(/^(tv|th|mf|[1-9]|([1-4][0-9]?|50)|[a-z]|([a-z]-[1-9][0-9]?[0-9]?))$/);
        }
    });

    it('should generate a random zip code and city name from database', async () => {
        const allPostalCodes = await Repo.findPostalCodes();
        for (const address of addresses) {
            expect(allPostalCodes).toContainEqual({ zip: address.zip, city: address.city });
        }
    });
});
