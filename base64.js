const fs = require('fs');

// Read the service key JSON
const serviceKeyJson = fs.readFileSync('=THE_DECODED_JSON=', 'utf8');

// Base64 encode the service key JSON
const base64ServiceKey = Buffer.from(serviceKeyJson, 'utf8').toString('base64');

// Print the base64 encoded service key JSON
console.log(base64ServiceKey);