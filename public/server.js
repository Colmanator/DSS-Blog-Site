import pg from 'pg';   //consider import
const { Client } = pg;
import express from 'express';
const app = express();

import tablesDM from "./datamen/tables.js";
//--------------------------------------------------//
const port = 3000;
//--------------------------------------------------//
function getClientObject() {
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'postgres'
    })
    return client
}

async function connect_test(client) {
    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

connect_test(getClientObject());
// tablesDM.create_test_table(getClientObject());
// tablesDM.create_user_table(getClientObject());
// tablesDM.create_post_table(getClientObject());
tablesDM.create_review_table(getClientObject());

//--------------------------------------------------//
app.use(express.static('./public'));
//--------------------------------------------------//
// Landing page
app.get('/', (req, res) => {
    /// send the static file
    res.sendFile(__dirname + '/pages/home.html', (err) => {
        if (err){
            console.log(err);
        }
    })
});
//--------------------------------------------------//
app.listen(port, () => {
    console.log(`My app listening on port ${port}!`)
});
