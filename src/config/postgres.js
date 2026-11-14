const { Pool, types } = require("pg");
require('dotenv').config({ override: true })

// Asegurar que timestamps sin zona horaria (OID 1114) se interpreten como UTC
types.setTypeParser(1114, (stringValue) => {
    return stringValue ? new Date(stringValue.replace(' ', 'T') + 'Z') : null;
});

const pool = new Pool({
    user: process.env.USER_DB || 'postgres',
    password: process.env.PASSWORD_DB || 'carloscras15',
    host: process.env.HOST_DB || 'localhost',
    database: process.env.NAME_DB || 'cgtham_db',
    port: process.env.PORT_DB || 5432,
    ssl: process.env.SSL_DB === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
