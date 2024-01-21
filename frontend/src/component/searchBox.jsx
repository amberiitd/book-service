import { debounce } from "lodash";

const SearchBox = ({ onInput }) => {
	return (
		<div>
			<input type="text" placeholder="Search..." onChange={debounce((e) => onInput(e.target.value), 1000)} />
		</div>
	);
};

export default SearchBox;
