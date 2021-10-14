const Pool = require('pg').Pool;

var connection = {
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

var pool = new Pool(connection);

export default pool;