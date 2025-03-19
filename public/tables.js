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
        await client.query("CREATE TABLE users (email varchar, displayName varchar, password varchar, salt varchar, premiumStatus bool)")
        await client.end()
    }
}

export default new TableDataManager();