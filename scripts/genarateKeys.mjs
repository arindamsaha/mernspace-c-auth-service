import crypto from 'crypto';
import fs from 'fs';
import path from 'path';


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});


console.log('Keys generated successfully.', publicKey);
console.log('Keys generated successfully.', privateKey);

fs.writeFileSync('keys/publicKey.pem', publicKey);
fs.writeFileSync('keys/privateKey.pem', privateKey);

