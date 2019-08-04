const dbConfig = require('../config/db_config');
const { Pool } = require('pg');

const pool = new Pool(dbConfig);

module.exports = {
    query: (text, params, onlyRows = true) => {
        const start = Date.now();
        return new Promise((resolve, reject) => {
            pool.query(text, params, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                const duration = Date.now() - start;
                console.log('executed query', { text, params, duration, rows: res.rowCount });
                if (onlyRows) { resolve(res.rows); }
                else { resolve(res); }
            })
        })
    }
}