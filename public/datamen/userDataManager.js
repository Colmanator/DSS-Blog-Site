//card_number varchar, card_csv varchar, card_expiration varchar

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

        const query = "SELECT * FROM users WHERE email = $0";
        const params = [emailIn];
        const result = await client.query(query, params);

        await client.end()
        return result;
    }

    async get_usersByDisplayName(client, nameIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "SELECT * FROM users WHERE display_name = $0"
        const params = [nameIn];
        const result = await client.query(query, params);

        await client.end()
        return result;
    }

    async get_usersByStatus(client, statusIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set


        const query = "SELECT * FROM users WHERE premium_status = $0"
        const params = [statusIn];
        const result = await client.query(query, params);

        await client.end()
        return result;
    }

    async update_DisplayName(client, nameIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "UPDATE users SET displayName = $0 WHERE email = $1 "
        const params = [nameIn, emailIn];
        const result = await client.query(query, params);

        await client.end();
        return result;
    }

    async update_status(client, statusIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "UPDATE users SET premiumStatus = $0 WHERE email = $1"
        const params = [statusIn, emailIn];
        const result = await client.query(query, params);

        await client.end();
        return result;
    }

    async update_salt(client, saltIn, emailIn ){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "UPDATE users SET salt = $0 WHERE email = $1 "
        const params = [saltIn, emailIn];
        const result = await client.query(query, params);

        await client.end();
        return result;
    }

    async update_password(client, passwordIn, emailIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "UPDATE users SET password = $0 WHERE email = $1"
        const params = [passwordIn, emailIn];
        const result = await client.query(query, params);

        await client.end();
        return result;
    }

    async create_userInDatabase(client, emailIn, nameIn, passwordIn, saltIn, card_numberIn, card_csvIn, card_expirationIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "INSERT INTO users(email, display_name, password, salt, premium_status, card_number, card_csv, card_expiration) VALUES($0, $1, $2, $3, False, $4, $5, $6)"
        const params = [emailIn, nameIn, passwordIn, saltIn, card_numberIn, card_csvIn, card_expirationIn, card_expirationIn];
        const result = await client.query(query, params);

        await client.end()
        return result;
    }

    async deleteUser(client, userEmail){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "DELETE FROM users WHERE email = $0"
        const params = [userEmail];
        const result = await client.query(query, params);

        await client.end();
        return result;
    }

}
export default new UserDataManager();