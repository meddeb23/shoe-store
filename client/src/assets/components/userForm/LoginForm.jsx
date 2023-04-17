import Axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import bg_img from "../../images/whereslugo-ad047kyPBh8-unsplash.jpg";

export default function LoginForm() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const res = await Axios.post("/api/v1/user/login", { email, password });
      setIsFetching(false);
      if (res.status === 200) {
        setUser(res.data.user);
        setIsLoggedIn(true);
        history.replace(from);
      }
    } catch (error) {
      setIsFetching(false);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="md:grid grid-cols-5 min-h-screen">
      <div className="col-span-2">
        <NavLink to="/">
          <h1 className="font-bold text-gray-600 p-4 text-lg">ShoStore</h1>
        </NavLink>
        <form
          className="text-center p-8 max-w-xs mx-auto"
          onSubmit={(e) => onsubmitForm(e)}
        >
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            member login
          </h1>
          <div className="mt-2">
            <label htmlFor="email" className="block font-semibold text-left">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-gray-100 rounded-lg shadow-md py-2 px-4 my-2"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="input">
            <label htmlFor="Password" className="block font-semibold text-left">
              Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-gray-100 rounded-lg shadow-md py-2 px-4 my-2"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
            />
          </div>
          <p className="h-4 text-xs text-left text-red-500">{error}</p>
          <button className="rounded-lg bg-indigo-500 py-2 px-4 text-center text-white font-bold text-sm w-full mt-2">
            {isFetching ? "Connection..." : "Log in"}
          </button>
          <div className="md:flex justify-between items-center">
            <div className="text-sm font-semibold text-blue-600 p-2">
              Forget password?
            </div>
            <NavLink to="/register">
              <div className="text-sm font-semibold text-blue-600 ">
                Create an account
              </div>
            </NavLink>
          </div>
        </form>
      </div>
      <div className="col-span-3 relative">
        <img
          src={bg_img}
          alt="The Best shose for you"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 text-center text-white left-0 p-20">
          <NavLink to="/">
            <h1 className="font-bold text-4xl">Digital shoes marketplace</h1>
          </NavLink>
          <p className="text-indigo-600 font-bold">
            Your perfect place to buy and sell Shoes
          </p>
        </div>
      </div>
    </div>
  );
}
