// https://nodejs.org/api/crypto.html
import { Buffer } from 'node:buffer';
const {
    scrypt,
    randomFill,
    createCipheriv,
    scryptSync,
    createDecipheriv,
    randomBytes,
} = await import('node:crypto');

const salt = randomBytes(16).toString("hex");
const algorithm = 'aes-256-cbc';
const password =  randomBytes(32).toString("hex");

function encryption(algorithm, password, stringIn, salt) {
// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
    scrypt(password, salt, 32, (err, key) => {
        if (err) throw err;
        // Then, we'll generate a random initialization vector
        randomFill(new Uint8Array(16), (err, iv) => {
            if (err) throw err;

            // Once we have the key and iv, we can create and use the cipher...
            const cipher = createCipheriv(algorithm, key, iv);

            let encrypted = cipher.update(stringIn, 'utf8', 'hex');
            encrypted = encrypted + cipher.final('hex');
            return {encrypted, password};
        });
    });
}

function deEncryption(algorithm, password, stringIn, salt){

// Use the async `crypto.scrypt()` instead.
    const key = scryptSync(password, salt, 32);
// The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.
    let decrypted = decipher.update(stringIn, 'hex', 'utf8');
    decrypted = decrypted + decipher.final('utf8');
    return decrypted;
// Prints: some clear text data
}

class Encrypter {
    salt = randomBytes(16).toString("hex");
    algorithm = 'aes-256-cbc';
    password =  randomBytes(32).toString("hex");

    async encrypt(stringIn){
        return encryption(algorithm, password, stringIn, salt);
    }

    async decrypt(stringIn){
        return deEncryption(algorithm, password, stringIn, salt);
    }

}
export default new Encrypter();