class TableDataManager {
    async create_test_table(client) {

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        await client.query("CREATE TABLE test (column1 varchar, column2 numeric)")
        await client.end()
    }
    async create_user_table(client){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        await client.query("CREATE TABLE users (column1 email, column2 displayName, column3 password, column4 salt)")
        await client.end()
    }
    async create_post_table(client){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        await client.query("CREATE TABLE posts (title , summary, rating, premium ingredients, method)")
        await client.end()
    }
}

export default new TableDataManager();