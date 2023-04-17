import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../views/Home";
import ProductPage from "../views/ProductPage";
import ProductDetail from "../views/ProductDetail";
import AdminBoard from "../views/AdminBoard";
import LoginForm from "../components/userForm/LoginForm";
import Register from "../components/userForm/Register";

import { UserContext } from "../components/context/UserContext";
import Cart from "../views/Cart";
import { AuthRoute, Admin } from "../components/protectedRoute";
import Checkout from "../views/Checkout";

export default function Routes() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shose">
          <ProductPage />
        </Route>
        <Route path="/shoe/:id">
          <ProductDetail />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin">
          <AdminBoard />
        </Route>

        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
}
