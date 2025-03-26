import { createHash, randomBytes } from 'node:crypto';

import json from "./Pepper.json" with { type: "json" };
let pepper = json.pepper;
//Added because Pepper.json refuses to import - classic webdev working never

class hashManager {
    hash_password(password_in, salt_in){
        let prehash = pepper + salt_in + password_in;
        let hashed_password = createHash('sha256').update(prehash).digest('hex');
        console.log(hashed_password);
        return hashed_password
    }

    generate_salt(){
        return randomBytes(16).toString("hex");
    }
}

export default new hashManager

