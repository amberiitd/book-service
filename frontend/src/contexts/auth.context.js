import { toast } from "react-toastify";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState();
	const login = async (username, password) => {
		try {
			const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then((data) => {
				if (data.status === 200) return data.json();
				throw Error((data.json()).error);
			});
			if (res.status) localStorage.setItem("authToken", res.token);
			setAuthToken(res.token);
			toast.info("user logged in");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const logout = async () => {
    localStorage.removeItem("authToken");
		setAuthToken(null);
	};

	const register = async (username, password) => {
		try {
			const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then((data) => {
				if (data.status === 200) return data.json();
				throw Error((data.json()).error);
			});
			localStorage.setItem("authToken", res.token);
			setAuthToken(res.token);
			toast.info("user registered and logged in");
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setAuthToken(storedToken);
		}
	}, []);
	return <AuthContext.Provider value={{ authToken, login, register, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
