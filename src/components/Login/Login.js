import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "usernameInput") {
      setUsername(value);
    }

    if (id === "passwordInput") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ username, password })
      );

      console.log(response);

      if (response.data.status === false) {
        window.alert(response.data.message);
      } else {
        sessionStorage.setItem(username, response.data.data);

        navigate(`/chat?user=${username}`);
      }

      setUsername("");
      setPassword("");
    } catch (err) {
      window.alert(err);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usernameInput">Username</label>
          <input
            required={true}
            type="text"
            className="form-control form-control-lg"
            id="usernameInput"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            required={true}
            type="password"
            className="form-control form-control-lg"
            id="passwordInput"
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Login
        </button>
      </form>
    </div>
  );
}
