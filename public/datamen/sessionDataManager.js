class SessionDataManager {

    async get_session_by_status(client, id_in) {
        await client.connect();
        const text = "SELECT * FROM sessions WHERE id = ($0)"
        const values = [id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
        await client.end()
        return result;
    }

    async delete_session(client, id_in){
        await client.connect();
        const text = "DELETE FROM sessions WHERE id = ($0)";
        const values = [id_in]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
        await client.end();
        return result;
    }

    async create_session_in_database(id_in, email_in, timestamp_in){

        await client.connect();
        const text = "INSERT INTO sessions(id, email, time_created) VALUES($0, $1, $2)";
        const values = [id_in, email_in, timestamp_in];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(text, values);
        await client.end();
        return result;
    }

}
export default new SessionDataManager;