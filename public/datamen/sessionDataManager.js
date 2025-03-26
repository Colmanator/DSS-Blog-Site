import getClientObject from "../js/getClientObject.js";

class SessionDataManager {

    async get_session_by_session_id(session_id_in) {
        const client = getClientObject()

        await client.connect();
        const query = "SELECT * FROM sessions WHERE session_id = $1"
        const params = [session_id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_all() {
        const client = getClientObject()

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const result = await client.query("SELECT * FROM sessions");
        await client.end()
        return result;
    }

    async delete_session(session_id_in){
        const client = getClientObject()

        await client.connect();
        const query = "DELETE FROM sessions WHERE session_id = $1";
        const params = [session_id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async create_session_in_database(session_id_in, email_in){
        const client = getClientObject()

        await client.connect();
        const query = "INSERT INTO sessions(session_id, email, session_start) VALUES($1, $2, DEFAULT)";
        const params = [session_id_in, email_in];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

}
export default new SessionDataManager;