const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
};

async function doQuery(query) {
    const conn = await mysql.createConnection(dbConfig);
    const data = await conn.execute(query);
    await conn.end();
    return data[0];
};
async function doQueryParams(query, array) {
    const conn = await mysql.createConnection(dbConfig);
    const data = await conn.execute(query, array);
    await conn.end();
    return data[0];
};

async function doPostQuery(query, array) {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(query, array);
    await conn.end();
    return 'New Movie inserted into database!';
};

module.exports = {
    doQueryParams,
    doQuery,
    doPostQuery
};