import { Surreal } from "surrealdb.node";

type PostalCode = { code: number, city: string, id?: string };
type AddressData = { name: string, postal_codes: PostalCode[] };
class Repo {
    private db = new Surreal();
    public initialized = false;

    constructor() {
        this.connect();
    }

    private async connect() {
        await this.db.connect(process.env.DB_URL || "this will fail").catch(console.error);
        await this.db.use({ ns: "generator", db: "generator" }).catch(console.error);
        this.initialized = true;
    }

    public async getRandomAddressData(n: number): Promise<AddressData[]> {
        if (n < 1) n = 1;
        
        // Wait for the database to be initialized
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Get a random street name from the database
        type PostalCode = { name: string, code: number };
        const result = await this.db.query(
            `SELECT *, postal_codes.*.* FROM street_name ORDER BY RAND() LIMIT ${n}`
        ) as AddressData[];

        while (result.length < n) {
            const dup = result[Math.floor(Math.random() * result.length)]
            result.push(dup);
        }
        
        return result;
    }

    public async findPostalCodes(): Promise<PostalCode[]> {
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return await this.db.query("SELECT * FROM postal_code") as PostalCode[];
    }

    public async findStreetNames(): Promise<string[]> {
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const result = await this.db.query("SELECT * FROM street_name") as AddressData[];
        return result.map(r => r.name);
    }
}

export default new Repo();
