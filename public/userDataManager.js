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

    async get_usersByDisplayName(client, nameIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE displayName = nameIn")
        await client.end()
        return result;
    }

    async get_usersByStatus(client, statusIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE premiumStatus = statusIn")
        await client.end()
        return result;
    }

    async create_userInDatabase(client,emailIn, nameIn, passwordIn, saltIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE displayName = nameIn")
        await client.end()
        return result;
    }



}
export default new UserDataManager();