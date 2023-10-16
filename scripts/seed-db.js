import { Surreal } from 'surrealdb.node';
import fs from 'fs';

main();

async function main() {
    const db = new Surreal();
    try{
        await db.connect(process.env.DB_URL);
        await db.use({ ns: "generator", db: "generator" });
    
        const sql = fs.readFileSync('./src/data/addresses.sql');
        const streetNames = fs.readFileSync('./src/data/street-names.txt');

        const postalQuery = preparePostalCodes(sql);
        const streetNameQuery = prepareStreetNames(streetNames);

        console.log("Creating UNIQUE INDEX on TABLE `postal_code` for COLUMN `code`...");
        await db.query('DEFINE INDEX postalCodeIndex ON TABLE postal_code COLUMNS code UNIQUE');
        console.log("Creating UNIQUE INDEX on TABLE `street_name` for COLUMN `name`...");
        await db.query('DEFINE INDEX streetNameIndex ON TABLE street_name COLUMNS name UNIQUE');

        console.log("Inserting data into table postal_code...")
        const postalResult = await db.query(postalQuery);
        console.log("Inserted", postalResult.length, "rows into table postal_code");

        console.log("Inserting data into table street_name...")
        const streetNameResult = await db.query(streetNameQuery);
        console.log("Inserted", streetNameResult.length, "rows into table street_name");
    } catch (e) {
        console.error(e);
    }
}

function preparePostalCodes(sql) {
    const data = sql
    .toString()
    .split('INSERT INTO `postal_code` (`cPostalCode`, `cTownName`) VALUES')[1]
    .split('COMMIT;')[0]
    .split('\n')
    .map((line) => line
        .split(',')
        .map((part) => part.replace(/'/g, '').replace(/[()]/g, '').trim())
        .filter((part) => part !== '')
    ).filter((line) => line.length > 0);
    
    data.forEach((line) => {
        while (line.length > 2) {
            line[1] += `, ${line.pop()}`;
        }
    });

    const surrealql = data
        .map((line) => `CREATE postal_code SET zip = "${line[0]}", city = "${line[1]}";`)
        .join('\n');

    return surrealql;
}

function prepareStreetNames(text) {
    const data = text
        .toString()
        .split('\n')
        .filter((line) => line.length > 0);

    const surrealql = data
        .map((line) => `CREATE street_name SET name = "${line}";`)
        .join('\n');

    

    return surrealql;
}