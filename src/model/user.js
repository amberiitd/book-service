// models/user.js
const bcrypt = require("bcrypt");
const connection = require("../config/db");

async function findByUsername(username) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
			if (error) {
				reject(error);
			} else if (results.length === 0) {
				resolve(null);
			} else {
				resolve(results[0]);
			}
		});
	});
}

async function findById(id) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
			if (error) {
				reject(error);
			} else if (results.length === 0) {
				resolve(null);
			} else {
				resolve(results[0]);
			}
		});
	});
}

async function createUser(username, password) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return new Promise((resolve, reject) => {
		connection.query(
			"INSERT INTO users (username, password) VALUES (?, ?)",
			[username, hashedPassword],
			(error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.insertId);
				}
			}
		);
	});
}

module.exports = {
	findByUsername,
	findById,
	createUser,
};
