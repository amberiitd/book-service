const { cache, CACHE_DURATION } = require("../config/cache");
const db = require("../config/db");

function getBooks(search = {}) {
	search = sanitizeSearch(search);
	const cacheKey = "/" + JSON.stringify(search);

	// Check if the data is already in the cache
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.info("Data retrieved from cache");
		return Promise.resolve(cachedData);
	}

	return new Promise((resolve, reject) => {
		const [query, params] = prepareGetBookQuery(search);
		db.pool.query(query, params, queryCallBack(resolve, reject, cacheKey));
	});
}

function getBooksCount(search = {}) {
  search = sanitizeSearch(search);
	const cacheKey = "/count" + JSON.stringify(search);

	// Check if the data is already in the cache
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.info("Data retrieved from cache");
		return Promise.resolve(cachedData);
	}

	return new Promise((resolve, reject) => {
		const [query, params] = prepareGetBookQuery(search, true);
		db.pool.query(query, params, queryCallBack(resolve, reject, cacheKey));
	});
}

function queryCallBack(resolve, reject, cacheKey) {
	return (error, results) => {
		if (error) {
			reject(error);
		} else {
			cache.put(cacheKey, results, CACHE_DURATION);
			console.info("Data added to cache");
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

function sanitizeSearch(search={}){
  return { ...search, page: search.page || 1, size: search.size || 100 };
}

module.exports = { getBooks, getBooksCount };
