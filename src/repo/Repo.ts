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

    public async getRandomFromPostalCode(n: number): Promise<{ zip: number, city: string }[]> {
        if (n < 1) n = 1;
       
        // Wait for the database to be initialized
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const query = "SELECT * FROM postal_code ORDER BY RAND() LIMIT 1;"

        // Get a random postal code and city name from the database
        const result = await this.db.query("SELECT * FROM postal_code") as { zip: string, city: string }[];
        const mappedResult = result.flat().map(r => ({ zip: parseInt(r.zip), city: r.city}));

        let postalCodes: { zip: number, city: string }[] = [];
        for (let i = 0; i < n; i++) {
            postalCodes.push(mappedResult[Math.floor(Math.random() * mappedResult.length)]);
        }

        // If no result, return a default value
        if (postalCodes.length < 1) return [{ zip: 1301, city: "København K" }];

        // Return the result
        return postalCodes;
    }

    public async getRandomFromStreetName(n: number): Promise<string[]> {
        if (n < 1) n = 1;
        
        // Wait for the database to be initialized
        while (!this.initialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Get a random street name from the database
        const result = await this.db.query("SELECT * FROM street_name ORDER BY RAND()") as { name: string }[];
        const mappedResult = result.flat().map(r => r.name);

        let streetNames: string[] = [];
        for (let i = 0; i < n; i++) {
            streetNames.push(mappedResult[Math.floor(Math.random() * mappedResult.length)]);
        }
         
        
        // If no result, return a default value
        if (streetNames.length < 1) return ["Østergade"];

        // Return the result
        return streetNames;
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
