import hashManager from "../js/Hash.js"
import userDM from "../datamen/userDataManager.js";
import sessionDM from "../datamen/sessionDataManager.js";
import {getRandomValues} from "crypto";
import * as timers from "node:timers";

class UserController {
    // Alter Account,
    async create_user (email_in, display_name_in, password_in) {
        let salt_in = hashManager.createSalt();

        return await userDM.create_userInDatabase(email_in, display_name_in, password_in, salt_in, false, false, null, null, null)
    }
    async verify_user (email_in) {
        return await userDM.set_verification(email_in);
    }

    async login (email_in, password_in) {
        let start_time = Date.now();
        let dbResponse = await userDM.get_userByEmail(email_in, password_in);
        if (dbResponse.rows.length !== 0) {
            let user = dbResponse.rows[0]
            let password = user.password;
            let verified = user.verified;

            if ((password === password_in) && (verified === true)) {
                //THIS IS TERRIBLE PRACTICE AND SHOULD BE CHANGED! SESSION_ID SET TO EMAIL AS A TEMPORARY MEASURE!
                let session_id = email_in
                try {
                    await sessionDM.create_session_in_database(session_id, email_in, password);
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

}
export default new UserController;