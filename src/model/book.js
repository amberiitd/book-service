const { connection } = require("../config/db");
const cache = require("memory-cache");
const CACHE_DURATION = 60 * 1000;

function getBooks(search = {}) {
	const cacheKey = "/" + JSON.stringify(criteria);

	// Check if the data is already in the cache
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.log("Data retrieved from cache");
		return Promise.resolve(cachedData);
	}

	return new Promise((resolve, reject) => {
		const [query, params] = prepareGetBookQuery(search);
		connection.query(query, params, queryCallBack(resolve, reject, cacheKey));
	});
}

function getBooksCount(search = {}) {
  const cacheKey = "/count" + JSON.stringify(criteria);

	// Check if the data is already in the cache
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.log("Data retrieved from cache");
		return Promise.resolve(cachedData);
	}

	return new Promise((resolve, reject) => {
		const [query, params] = prepareGetBookQuery(search, true);
		connection.query(query, params, queryCallBack(resolve, reject, cacheKey));
	});
}

function queryCallBack(resolve, reject, cacheKey) {
	return (error, results) => {
		if (error) {
			reject(error);
		} else {
			cache.put(cacheKey, results, CACHE_DURATION);
			console.log("Data added to cache");
			resolve(results);
		}
	};
}

function prepareGetBookQuery(criteria, count = false) {
	let query = `SELECT ${count ? "count(*) as count" : "*"} FROM books WHERE 1`;
	const params = [];

	if (criteria.title) {
		query += " AND title LIKE ?";
		params.push(`%${criteria.title}%`);
	}

	if (criteria.author) {
		query += " AND author LIKE ?";
		params.push(`%${criteria.author}%`);
	}

	if (criteria.publishedYearStart) {
		query += " AND publication_year >= ?";
		params.push(criteria.publishedDateStart);
	}

	if (criteria.publishedYearEnd) {
		query += " AND publication_year <= ?";
		params.push(criteria.publishedDateEnd);
	}

	if (criteria.genre) {
		query += " AND genre LIKE ?";
		params.push(`%${criteria.genre}%`);
	}

	if (criteria.availability !== undefined) {
		query += " AND availability = ?";
		params.push(criteria.availability);
	}

	if (criteria.sortBy && !count) {
		const sortOrder = criteria.sortOrder === "desc" ? "DESC" : "ASC";
		query += ` ORDER BY ${criteria.sortBy} ${sortOrder}`;
	}

	if (criteria.page && criteria.size && !count) {
		const offset = (criteria.page - 1) * criteria.size;
		query += " LIMIT ? OFFSET ?";
		params.push(parseInt(criteria.size, 10), offset);
	}

	return [query, params];
}

module.exports = { getBooks, getBooksCount };
