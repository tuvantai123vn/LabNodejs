import "./navbar.css";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const login = () => {
    window.location = "http://localhost:3000/login";
  };
  const signup = () => {
    window.location = "http://localhost:3000/signup";
  };
  const logout = () => {
    localStorage.removeItem("Token");
    return window.location = "http://localhost:3000/login";
  };
  const token = localStorage.getItem("Token");
  if (!token) {
    return (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <button onClick={signup} className="navButton">
                Register
              </button>
              <button onClick={login} className="navButton">
                Login
              </button>
            </div>
          </div>
        </div>
      );
  }
  try {
    const user = jwtDecode(token);
    return (
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">Booking Website</span>
          <div className="navItems">
            <span className="logo">{user.username}</span>
            <button onClick={signup} className="navButton">
              Transaction
            </button>
            <button onClick={logout} className="navButton">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Navbar;
