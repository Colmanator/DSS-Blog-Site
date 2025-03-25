import { createHash, randomBytes } from 'node:crypto';

// const json = require("./Pepper.json");
let pepper = "6c6f88d1471148351332619c893d7285";
//Added because Pepper.json refuses to import - classic webdev working never

class hashManager {
    hash(string) {
        return createHash('sha256').update(string);
    }
    saltAdd (hashString, salt){
        return hashString.update(salt + hashString);
    }
    pepperAdd (hashString, pepper){
        return hashString.update(pepper + hashString);
    }
    getPepper(){
        const json = require('./Pepper.json');
        return json.pepper;
    }
    createSalt(){
        return randomBytes(16).toString("hex");
    }
    hashString(string, salt) {
        let pepper = getPepper();
        let hashv1 = saltAdd(string,salt);
        return hash(pepperAdd(hashv1, pepper));
    }
    createSecurePassword(){
        let salt = createSalt();
        let pepper = getPepper();
        let hashv1 = saltAdd(string,salt);
        let password = hash(pepperAdd(hashv1, pepper));
        return {salt , password};
    }
}

export default new hashManager

