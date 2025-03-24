import userDM from "../datamen/userDataManager.js";
import sessionDM from "../datamen/sessionDataManager.js";
import {getRandomValues} from "crypto";
import * as timers from "node:timers";

class UserController {
    // Create Account, Alter Account, Delete Account, checkLogIn,
    async create_user (email_in, display_name_in, password_in) {
        return await userDM.create_userInDatabase(email_in, display_name_in, password_in, "salt", false, false, null, null, null)
    }

    async verify_user (email_in) {
        return await userDM.set_verification(email_in);
    }

    async login (email_in, password_in) {
        let start_time = Date.now();
        let user = (await userDM.get_userByEmail(email_in, password_in)).rows[0];

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

    async prune_sessions () {
        let dbResponse = await sessionDM.get_all();
        let active_sessions = await dbResponse.rows;
        active_sessions.forEach(session => {
            let session_start = session.session_start;

            if (Date.now() >= (Date.parse(session_start) + 10000)) {
                sessionDM.delete_session(session.session_id);
            }
        })
    }

}
export default new UserController;