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
        const result = await client.query("SELECT * FROM users WHERE email = [0]", emailIn);
        await client.end()
        return result;
    }

    async get_usersByDisplayName(client, nameIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE displayName = [0]", nameIn);
        await client.end()
        return result;
    }

    async get_usersByStatus(client, statusIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users WHERE premiumStatus = [0]", statusIn);
        await client.end()
        return result;
    }

    async update_DisplayName(client, nameIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE users SET displayName = [0] WHERE email = [1] ", nameIn, emailIn);
        await client.end();
        return result;
    }

    async update_status(client, statusIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE users SET premiumStatus = [0] WHERE email = [1] ", statusIn, emailIn);
        await client.end();
        return result;
    }

    async update_salt(client, saltIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE users SET salt = [0] WHERE email = [1] ", saltIn, emailIn);
        await client.end();
        return result;
    }

    async update_password(client, passwordIn, emailIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE users SET password = [0] WHERE email = [1] ", passwordIn, emailIn);
        await client.end();
        return result;
    }

    async create_userInDatabase(client, emailIn, nameIn, passwordIn, saltIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(
            "INSERT INTO users(email, displayName, password, salt, premiumStatus)" +
            "VALUES($0, [1], [2], [3], False)", emailIn, nameIn, passwordIn, saltIn);
        await client.end()
        return result;
    }
    
    async deleteUser(client, userEmail){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("DELETE FROM users WHERE email = [0]", userEmail);
        await client.end();
        return result;
    }

}
export default new UserDataManager();