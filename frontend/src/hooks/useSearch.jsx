import { useState } from "react";
import { getBooks } from "../api/general";
import { useAuthContext } from "../contexts/auth.context";

const useSearch = () => {
  const {authToken}= useAuthContext();
	const [bookList, setBookList] = useState([]);
	const [searchError, setSearchError] = useState();
	const [isFetching, setFetching] = useState(false);

  

	const onSearch = async (searchText) => {
		setFetching(true);
		try {
			const books = await getBooks(searchText, authToken);
			
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
