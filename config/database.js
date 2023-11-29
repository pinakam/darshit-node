
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'darshit',
  password: '1234',
  database: 'mydb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
