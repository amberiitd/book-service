import { useState } from "react";
import { getBooks } from "../api/general";

const useSearch = () => {
	const [bookList, setBookList] = useState([]);
	const [searchError, setSearchError] = useState();
	const [isFetching, setFetching] = useState(false);

  

	const onSearch = async (searchText) => {
		setFetching(true);
		try {
			const books = getBooks(searchText);
			
			setBookList(books);
		} catch (error) {
			setSearchError(error);
		}
		setFetching(false);
	};

	return {
		bookList,
		onSearch,
    isFetching,
    searchError
	};
};

export default useSearch;
