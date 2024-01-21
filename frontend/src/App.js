import SearchBox from "./component/searchBox";
import ShowList from "./component/showList";
import useSearch from "./hooks/useSearch";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "./contexts/auth.context";
import Login from "./component/login";
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
	const { authToken } = useAuthContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (!authToken) {
			navigate("/login");
		}
	}, [authToken]);

	return children;
};

function App() {
	const { bookList, onSearch } = useSearch();
  const {logout}  = useAuthContext();
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/app"
						element={
							<AuthGuard>
								<div className="container border border-1">
                  <button onClick={logout}>Logout</button>
									<SearchBox onInput={onSearch} />
									<ShowList books={bookList} />
								</div>
							</AuthGuard>
						}
					/>
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}

export default App;
