import { Surreal } from "surrealdb.node";

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

    public async getRandomFromPostalCode(): Promise<{ zip: number, city: string }> {
        // Wait for the database to be initialized
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Get a random postal code and city name from the database
        const result = await this.db.query("SELECT * FROM postal_code ORDER BY RAND() LIMIT 1") as { zip: string, city: string }[];

        // If no result, return a default value
        if (!result[0]) return { zip: 1301, city: "København K" };

        // Return the result
        return { 
            zip: parseInt(result[0].zip), 
            city: result[0].city 
        };
    }

    public async getRandomFromStreetName(): Promise<string> {
        // Wait for the database to be initialized
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Get a random street name from the database
        const result = await this.db.query("SELECT * FROM street_name ORDER BY RAND() LIMIT 1") as { name: string }[];

        // If no result, return a default value
        if (!result[0]) return "Østergade";

        // Return the result
        return result[0].name;
    }

    public async findPostalCodes(): Promise<{ zip: number, city: string }[]> {
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const result = await this.db.query("SELECT * FROM postal_code") as { zip: string, city: string }[];
        return result.map(r => ({ zip: parseInt(r.zip), city: r.city }));
    }

    public async findStreetNames(): Promise<string[]> {
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const result = await this.db.query("SELECT * FROM street_name") as { name: string }[];
        return result.map(r => r.name);
    }
}

export default new Repo();
