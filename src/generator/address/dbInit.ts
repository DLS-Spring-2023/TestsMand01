import { log } from 'console';
import fs from 'fs';

const sql = fs.readFileSync('./src/generator/address/addresses.sql');

function prepareData(sql: string) {
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

    return data;
}

console.log(prepareData(sql.toString()));




