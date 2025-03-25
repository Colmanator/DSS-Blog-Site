import pg from 'pg';
const { Client } = pg;

export default function getClientObject() {
    const client = new Client({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'postgres'
    })
    return client
}