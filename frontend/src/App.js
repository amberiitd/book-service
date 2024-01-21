import SearchBox from "./component/searchBox";
import ShowList from "./component/showList";
import useSearch from "./hooks/useSerch";

function App() {

  const { bookList, onSearch } = useSearch();
	return (
		<div className="container border border-1">
			<SearchBox onInput={onSearch}/>
			<ShowList books={bookList} />
		</div>
	);
}

export default App;
