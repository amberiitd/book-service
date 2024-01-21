export function getBooks(searchString, token) {
	const queryParams = {
		...(searchString ? { title: searchString } : {}),
		// author: 'J.K. Rowling',
		// sortBy: 'title',
		// sortOrder: 'asc',
		// page: 1,
		// size: 10,
	};

	// Convert parameters to a query string
	const queryString = new URLSearchParams(queryParams).toString();
	return fetch(`${process.env.REACT_APP_API_BASE_URL}/books?${queryString}`, {
		headers: {
			Authorization: token,
		},
	}).then((data) => data.json());
}
