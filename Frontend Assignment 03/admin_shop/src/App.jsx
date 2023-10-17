import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import NewProduct from "./New/NewProduct";
import Update from "./update/update";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const cookies = new Cookies();
  const [login, setLogin] = useState(false);
  const token = cookies.get("accessToken");
  const decodedToken = token ? jwt_decode(token) : {};
  const { role } = decodedToken;
  useEffect(() => {
    if (token) {
      console.log('token', token);
      setLogin(true);
    }
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <Header user = {decodedToken}/>
          <Menu login = {login}/>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute
              path="/chat"
              component={Chat}
              roles={["admin", "customer"]}
              role={role}
            />
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
              roles={["admin"]}
              role={role}
            />
            <ProtectedRoute
              path="/users"
              component={Users}
              roles={["admin"]}
              role={role}
            />
            <ProtectedRoute
              exact
              path="/products"
              component={Products}
              roles={["admin"]}
              role={role}
            />
            <ProtectedRoute
              path="/history"
              component={History}
              roles={["admin"]}
              role={role}
            />
            <ProtectedRoute
              path="/new"
              component={NewProduct}
              roles={["admin"]}
              role={role}
            />
            <ProtectedRoute
              path="/products/view-edit/:id"
              component={Update}
              roles={["admin"]}
              role={role}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
