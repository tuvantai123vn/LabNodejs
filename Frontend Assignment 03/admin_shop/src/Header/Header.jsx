import React from "react";
import Logoicon from "../Image/logo-icon.png";
import Logotext from "../Image/logo-text.png";
import Logolight from "../Image/logo-light-text.png";

function Header(props) {
  const { user } = props;
  console.log(user);
  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="#"
          >
            <i className="ti-menu ti-close"></i>
          </a>
          <div className="navbar-brand">
            <a href="/">
              <b className="logo-icon">
                <img src={Logoicon} alt="homepage" className="dark-logo" />
                <img src={Logoicon} alt="homepage" className="light-logo" />
              </b>
              <span className="logo-text">
                <img src={Logotext} alt="homepage" className="dark-logo" />
                <img src={Logolight} className="light-logo" alt="homepage" />
              </span>
            </a>
          </div>
          <a
            className="topbartoggler d-block d-md-none waves-effect waves-light"
            href="#"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="ti-more"></i>
          </a>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {/* <img src="../assets/images/users/IMG_6225.jpg" alt="user" className="rounded-circle"
                                    width="40" /> */}
            <span className="ml-2 d-none d-lg-inline-block">
              <span>Hello,</span> <span className="text-dark">{user.name}</span>{" "}
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
