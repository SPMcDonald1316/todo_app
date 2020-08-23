const Pool = require('pg').Pool;

const pool = new Pool({
  user: "Fill in user",
  password: "Fill in password if necessary",
  host: "localhost",
  port: 5432,
  database: 'todo_app'
});

module.exports = pool;