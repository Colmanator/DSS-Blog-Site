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
        const result = await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'dss_cw' AND table_name = 'users')");    // returns (within response object) a boolean indicating if the table exists within the specified schema
        // https://stackoverflow.com/questions/46500883/how-do-i-check-if-a-table-exists
        const { rows } = result;
        if (!rows[0].exists) {
            await client.query("CREATE TABLE users (email varchar PRIMARY KEY, display_name varchar NOT NULL, password varchar NOT NULL, salt varchar NOT NULL, premiumStatus bool NOT NULL, card_number varchar, card_csv varchar, card_expiration varchar)")
        }
        else {
            console.log("Table already exists.")
        }
        await client.end()
    }

    async create_post_table(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'dss_cw' AND table_name = 'posts')");    // returns (within response object) a boolean indicating if the table exists within the specified schema
        // https://stackoverflow.com/questions/46500883/how-do-i-check-if-a-table-exists
        const { rows } = result;
        if (!rows[0].exists) {
            await client.query("CREATE TABLE posts (id SERIAL PRIMARY KEY, title varchar NOT NULL, author_email varchar NOT NULL REFERENCES users(email) ON DELETE CASCADE, summary varchar, rating numeric NOT NULL CHECK (rating >= 1) CHECK (rating <= 5), premium_content bool NOT NULL, ingredients varchar NOT NULL, instructions varchar NOT NULL)")
        }
        else {
            console.log("Table already exists.")
        }
        await client.end()
    }

    async create_review_table(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'dss_cw' AND table_name = 'reviews')");    // returns (within response object) a boolean indicating if the table exists within the specified schema
        // https://stackoverflow.com/questions/46500883/how-do-i-check-if-a-table-exists
        const { rows } = result;
        if (!rows[0].exists) {
            await client.query("CREATE TABLE reviews (id SERIAL PRIMARY KEY, author_email varchar NOT NULL REFERENCES users(email) ON DELETE CASCADE, origin_post int NOT NULL REFERENCES posts(id) ON DELETE CASCADE, rating int NOT NULL CHECK (rating >= 1) CHECK (rating <= 5), comment varchar NOT NULL, UNIQUE(author_email, origin_post))")
        }
        else {
            console.log("Table already exists.")
        }
        await client.end()
    }
}

export default new TableDataManager();