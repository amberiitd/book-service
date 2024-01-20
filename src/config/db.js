const mysql = require("mysql");

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

connection.connect((error) => {
	if (error) {
		console.error(error);
	} else console.info("db connected");
});

module.exports = { connection }
