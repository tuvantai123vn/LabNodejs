import { useState } from "react";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    window.location = "http://localhost:3000/login";
  };
  const signup = () => {
    window.location = "http://localhost:3000/signup";
  };
  const home = () => {
    window.location = "http://localhost:3000";
  };
  const submitFrom = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    fetch("http://localhost:5001/api/v1/users/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((res) => {
        localStorage.setItem("Token", res.token);
        window.location = "http://localhost:3000/protected";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span onClick={home} className="logo">Booking Website</span>
          <div className="navItems">
            <button onClick={signup} className="navButton">
              Sign Up
            </button>
            <button onClick={login} className="navButton">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="title">
        <h1>Login</h1>
      </div>
      <div className="login">
        <form onSubmit={submitFrom}>
          <div className="lContainer">
            <input
              type="text"
              placeholder="username"
              id="username"
              className="lInput"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              className="lInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="lButton">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
