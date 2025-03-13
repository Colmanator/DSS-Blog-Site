class UserDataManager {
    async get_all(client){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users")
        await client.end()
        return result;
    }
    async get_userByEmail(client, emailIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE email = emailIn")
        await client.end()
        return result;
    }
    


}
export default new UserDataManager();