//card_number varchar, card_csv varchar, card_expiration varchar
import pg from 'pg';
import getClientObject from "../getClientObject.js";

class UserDataManager {
    async get_all(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM users")
        await client.end()
        return result;
    }

    async get_userByEmail(emailIn){
        const client = getClientObject();
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "SELECT * FROM users WHERE email = $1";
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

    async create_userInDatabase(email_in, display_name_in, password_in, salt_in, premium_status_in, verified_in, card_number_in, card_csv_in, card_expiration_in){

        const client = getClientObject()
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "INSERT INTO users(email, display_name, password, salt, premium_status, verified, card_number, card_csv, card_expiration) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)"
        const params = [email_in, display_name_in, password_in, salt_in, premium_status_in, verified_in, card_number_in, card_csv_in, card_expiration_in];
        const result = await client.query(query, params);

        await client.end()
        return result;
    }

    async set_verification(email_in){

        const client = getClientObject()
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set

        const query = "UPDATE users SET verified = true WHERE email = $1"
        const params = [email_in];
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