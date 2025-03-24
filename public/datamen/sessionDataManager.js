import getClientObject from "../getClientObject.js";

class SessionDataManager {

    async get_session_by_status(id_in) {
        const client = getClientObject()

        await client.connect();
        const text = "SELECT * FROM sessions WHERE id = ($0)"
        const values = [id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
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

    async delete_session(id_in){
        const client = getClientObject()

        await client.connect();
        const text = "DELETE FROM sessions WHERE session_id = $1";
        const values = [id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
        await client.end();
        return result;
    }

    async create_session_in_database(session_id_in, email_in){
        const client = getClientObject()

        await client.connect();
        const text = "INSERT INTO sessions(session_id, email, session_start) VALUES($1, $2, DEFAULT)";
        const values = [session_id_in, email_in];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
        await client.end();
        return result;
    }

}
export default new SessionDataManager;