import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { useAuthContext } = require("../contexts/auth.context");

const Login = () => {
	const { authToken, login, register } = useAuthContext();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (username && password)
			login(username, password).then(() => {
				setUsername("");
				setPassword("");
			});
	};

	useEffect(() => {
		if (authToken) {
			navigate("/app");
		}
	}, [authToken]);

	return (
		<div>
			<h2>Login Form</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input type="text" value={username} onChange={handleUsernameChange} />
				</label>
				<br />
				<label>
					Password:
					<input type="password" value={password} onChange={handlePasswordChange} />
				</label>
				<br />
				<button type="submit">Login</button>
				<button
					onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
						register(username, password).then(() => {
							setUsername("");
							setPassword("");
						});
					}}
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Login;
