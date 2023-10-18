import fs from 'fs';
// This script is used to get data from the Danish Address API
// It was used to get data for the project, but is not used anymore
// It is kept here for reference and in case it is needed again
async function main() {

    // BEWARE: This fetches over 50.000 street names
    const response = await fetch('https://api.dataforsyningen.dk/vejnavne');
    const data = await response.json();

    let txt = '';
    for (const d of data) {
        txt += d.navn + '\n';
    }
    console.log(txt);

    // Commented out to prevent overwriting the file by accident
    // fs.writeFileSync('src/data/street-names.txt', txt);
}

// main();