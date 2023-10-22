import { readFileSync } from 'fs';
import { AddressData } from '../src/repo/Repo';

type PostalCode = { code: number; city: string; name?: string };

export class Surreal {
	async connect(): Promise<void> {}
	async use(): Promise<void> {}
	async query(query: string): Promise<AddressData[]> {
		const n = parseInt(query.match(/LIMIT (\d+)/)?.[1] || '1');
		const file = readFileSync('src/data/street-names.json', 'utf-8');
		const data = JSON.parse(file);
		data.forEach(
			(d: { postal_codes: PostalCode[]; zips: PostalCode[] }) =>
				(d.postal_codes = d.zips.map((z) => ({ code: z.code, city: z.name! }))),
		) as AddressData[];
		data.forEach(
			(d: { postal_codes: string[]; zips?: string[] }) => delete d.zips,
		) as AddressData[];
		data.sort(() => Math.random() - 0.5);
		return data.slice(0, n);
	}
}
