const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER_DB || 'postgres',
    password: process.env.PASSWORD_DB || 'carloscras15',
    host: process.env.HOST_DB || 'localhost',
    database: process.env.NAME_DB || 'cgtham',
    port: process.env.PORT_DB || 5432,
    ssl: true
});

module.exports = pool;
