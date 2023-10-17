import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function LoginLink(props) {
  const cookies = new Cookies();

  const onRedirect = () => {
    axios.delete("http://localhost:5001/auth/logout", {
      withCredentials: true,
    });
    cookies.remove("accessToken");
  };

  return (
    <div onClick={onRedirect}>
        Logout
    </div>
  );
}

export default LoginLink;
