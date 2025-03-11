const { createHash, randomBytes } = require('node:crypto');

function hash(string) {
    return createHash('sha256').update(string);
}
function saltAdd (hashString, salt){
    return hashString.update(salt + hashString);
}
function pepperAdd (hashString, pepper){
    return hashString.update(pepper + hashString);
}
function getPepper(){
    const json = require('./Pepper.json');
    return json.pepper;
}
function createSalt(){
    return randomBytes(16).toString("hex");
}
function hashString(string, salt) {
    let pepper = getPepper();
    let hashv1 = saltAdd(string,salt);
    return hash(pepperAdd(hashv1, pepper));
}
function createSecurePassword(){
    let salt = createSalt();
    let pepper = getPepper();
    let hashv1 = saltAdd(string,salt);
    let password = hash(pepperAdd(hashv1, pepper));
    return {salt , password};
}