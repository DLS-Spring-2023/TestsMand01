import { readFileSync } from "fs";
import { AddressData } from "../src/repo/Repo";

export class Surreal {
    constructor() {}

    async connect(_: string, __?: any | undefined | null): Promise<void> {}
    async use(_: any): Promise<void> {}
    async query(query: string, __?: any | undefined | null): Promise<any> {
        const n = parseInt(query.match(/LIMIT (\d+)/)?.[1] || '1');
        const file = readFileSync('src/data/street-names.json', 'utf-8');
        const data = JSON.parse(file);
        data.forEach((d: any) => d.postal_codes = d.zips) as AddressData[];
        data.forEach((d: any) => delete d.zips) as AddressData[];
        data.sort(() => Math.random() - 0.5);
        return data.slice(0, n);
    }
}