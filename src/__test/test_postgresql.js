const { Pool, Client } = require('pg')
const connectionString = 'postgresql://hoc_db_owner:1111@127.0.0.1:5432/hoc_bs'

const pool = new Pool({
    connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})