const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER_DB || 'postgres',
    password: process.env.PASSWORD_DB || 'carloscras15',
    host: process.env.HOST_DB || 'localhost',
    database: process.env.NAME_DB || 'cgtham_db',
    port: process.env.PORT_DB || 5432,
    ssl: true // Se debe de comentar el SSL (Capa segura de socket) ya que de manera local no se ocupa 
                // Pero en producción es necesario activarlo (esto en Render -> Host para DB en la nube Pg)
});

module.exports = pool;
