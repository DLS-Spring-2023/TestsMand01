import { Surreal } from 'surrealdb.node';
import fs from 'fs';

main();

async function main() {
    const db = new Surreal();
    try{
        await db.connect(process.env.DB_URL);
        await db.use({ ns: "generator", db: "generator" });
        
        const streetNames = JSON.parse(fs.readFileSync('./src/data/street-names.json'));
        
        const { postalQuery, streetQuery } = prepareStreetNames(streetNames);
        
        console.log("Creating UNIQUE INDEX on TABLE `street_name` for COLUMN `name`...");
        await db.query('DEFINE INDEX streetNameIndex ON TABLE street_name COLUMNS name UNIQUE');

        console.log("Inserting data into table postal_code...")
        const postalResult = await db.query(postalQuery);
        console.log("Inserted", postalResult.length, "rows into table postal_code");

        console.log("Inserting data into table street_name...")
        const streetNameResult = await db.query(streetQuery);
        console.log("Inserted", streetNameResult.length, "rows into table street_name");
    } catch (e) {
        console.error(e);
    }
}

function prepareStreetNames(json) {

    let streetQuery = '';
    let zipCodes = [];
    for (const street of json) {
        const zips = [];
        for (const zip of street.zips) {
            if (!zipCodes.find(z => z.code === parseInt(zip.code))) {
                zips.push({ code: parseInt(zip.code), name: zip.name });
            }
        }
        streetQuery += `{ name: "${street.name}", postal_codes: [${street.zips.map(z => `postal_code:${z.code}`).join(", ")}] },\n`;
        zipCodes = zipCodes.concat(zips);
    }
    streetQuery = `INSERT INTO street_name [
        ${streetQuery}
    ]`;
    
    let postalQuery = '';
    for (const zip of zipCodes) {
        postalQuery += `{id: postal_code:${zip.code}, code: ${zip.code}, city: "${zip.name}" },\n`;
    }
    postalQuery = `INSERT INTO postal_code [
        ${postalQuery}
    ]`;

    return {
        postalQuery,
        streetQuery,
    }
}