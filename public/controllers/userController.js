import hashManager from "../js/Hash_v2.js"
import userDM from "../datamen/userDataManager.js";
import sessionDM from "../datamen/sessionDataManager.js";
import {getRandomValues} from "crypto";
import * as timers from "node:timers";

class UserController {
    // Delete
    async create_user (email_in, display_name_in, password_in) {
        let salt = hashManager.generate_salt();
        let hash = hashManager.hash_password(password_in, salt);
        return await userDM.create_userInDatabase(email_in, display_name_in, hash, salt, false, false, null, null, null)
    }

    async delete_user (email_in, display_name_in, password_in) {
        return await userDM.deleteUser(email_in)
    }
    async verify_user (email_in) {
        return await userDM.set_verification(email_in);
    }

    async login (email_in, unhashed_password_in) {
        let start_time = Date.now();

        let dbResponse = await userDM.get_userByEmail(email_in);
        if (dbResponse.rows.length !== 0) {
            let user = dbResponse.rows[0]
            let hashed_password_db = user.password;
            let salt = user.salt;
            let verified = user.verified;
//////////////////////////////////////////////////////////////////// Verified not in database //////////////////////////
            let hashed_password_in = hashManager.hash_password(unhashed_password_in, salt);
            console.log(hashed_password_in);
            //OUT: 1894dadaf53eed136c61258e089cbdbb85e9a86dbb19a11cbfb89422ec570dcc
            //DB : 1894dadaf53eed136c61258e089cbdbb85e9a86dbb19a11cbfb89422ec570dcc

            if ((hashed_password_db === hashed_password_in) && (verified === true)) {
                //THIS IS TERRIBLE PRACTICE AND SHOULD BE CHANGED! SESSION_ID SET TO EMAIL AS A TEMPORARY MEASURE!
                let session_id = email_in
                try {
                    await sessionDM.create_session_in_database(session_id, email_in, hashed_password_db);
                    let outObj = {
                        login_success: true,
                        session_id: session_id,
                        server_error: false
                    };
                    while (Date.now() < start_time + 500) {
                        //Wait
                    }
                    return outObj;
                }
                catch (error) {
                    let outObj = {
                        login_success: false,
                        session_id: null,
                        server_error: true
                    };
                    while (Date.now() < start_time + 500) {
                        //Wait
                    }
                    return outObj;
                }
            }
            else {
                let outObj = {
                    login_success: false,
                    session_id: null,
                    server_error: false
                };

                while (Date.now() < start_time + 500) {
                    //Wait
                }
                return outObj;
            }

        }
        else {
            let outObj = {
                login_success: false,
                session_id: null,
                server_error: false
            };

            while (Date.now() < start_time + 500) {
                //Wait
            }
            return outObj;
        }
    }
    async logout (session_id_in) {
        return await sessionDM.delete_session(session_id_in);
    }
    async prune_sessions () {
        let dbResponse = await sessionDM.get_all();
        let active_sessions = await dbResponse.rows;
        active_sessions.forEach(session => {
            let session_start = session.session_start;

            if (Date.now() >= (Date.parse(session_start) + 100000)) {
                sessionDM.delete_session(session.session_id);
            }
        })
    }

    async change_password (session_id_in, email_in, password_in) {
        const sessions = (await sessionDM.get_session_by_session_id(session_id_in)).rows;
        if (sessions.length !== 0) {
            return await userDM.set_password(password_in, email_in);
        }
    }
    // create session ID, check to see if its unique
    //https://workos.com/blog/session-management-best-practices
    async check_session_id_unique (session_id_in) {
        const sessions = await sessionDM.get_all();
        for (let sessionRow in sessions) {
            let session_id = sessions[sessionRow].session_id;
            if(session_id === session_id_in){
                return false;
            }
        }
        return true;
    }
    //https://workos.com/blog/session-management-best-practices
    async createSessionID(length = 32){
        let session_id = "";
        let check_good_session_id = false;
        while (check_good_sessionid === false) {
            let session_id = crypto.randomBytes(length).toString('hex');
            let unique_session = this.check_session_id_unique(session_id);
            if (unique_session === true) {
                check_good_session_id = true;
            }
        }
        return session_id;
    }

}
export default new UserController;