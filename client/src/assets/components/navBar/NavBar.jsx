import Axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { UserContext } from "../context/UserContext";

export default function NavBar() {
  const { search, setSearch } = useContext(SearchContext);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
  const [navMode, setNavMode] = useState(false);
  const [isopen, setIsopen] = useState(false);

  let history = useHistory();
  let path = useRouteMatch();

  // Close the nav bar whenever the URL changes
  useEffect(() => {
    setIsopen(false);
    return () => {
      setIsopen(false);
    };
  }, [path.url]);
  // Add the onScroll effect
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setNavMode(true);
      } else {
        setNavMode(false);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  // Logout user
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get("/api/v1/user/logout");
      setUser(null);
      setIsLoggedIn(false);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // Search for a product
  const onSearch = (e) => {
    e.preventDefault();
    console.log("pushing the route");
    history.push("/shose");
  };

  return (
    <header
      className={`${
        navMode ? "bg-indigo-700 shadow-md" : "bg-transparent"
      } flex flex-row items-center justify-between px-4 xl:px-10 py-4 fixed w-full top-0 left-0 z-50`}
    >
      {isopen && (
        <div className="nav-overlay" onClick={() => setIsopen(false)}></div>
      )}
      <NavLink to="/">
        <h1 className="text-white font-bold font-serif text-xl">ShoStore</h1>
      </NavLink>
      <div className="flex flex-row items-center space-x-4">
        <ul
          style={{
            transition: "left 300ms ease-in-out",
            left: isopen ? "0" : "100%",
          }}
          className="overflow-auto block fixed top-0 right-0 w-full h-full bg-indigo-700 text-right pt-20
        md:static md:w-auto md:h-auto md:text-center md:bg-transparent md:pt-0 md:flex md:flex-row md:space-x-4 md:items-center font-semibold text-white"
        >
          {/* Close icon */}
          <svg
            onClick={() => setIsopen(false)}
            className="w-5 h-5 md:hidden absolute top-4 left-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {/* end close icon */}
          <NavLink to="/" className="md:hidden">
            <h1 className="logo  text-center font-bold text-2xl">ShoStore</h1>
          </NavLink>
          {/* Search bar */}
          <form
            onSubmit={(e) => onSearch(e)}
            className=" lg:hidden border-b-2 border-gray-300
          m-4 mx-8 p-2 px-0 flex flex-row-reverse items-center justify-end text-white"
          >
            <button type="submit">
              <svg
                className="w-5 h-5 cursor-pointer outline-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full placeholder-white bg-transparent text-right mr-2 outline-none"
              placeholder="Search products..."
            />
          </form>
          <NavLink to="/">
            <li className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer">
              Home
            </li>
          </NavLink>
          <NavLink to="/shose">
            <li className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer">
              Product
            </li>
          </NavLink>
          <NavLink to="#contact">
            <li className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer">
              Contact us
            </li>
          </NavLink>
          {isLoggedIn ? (
            <>
              <li
                onClick={(e) => onLogout(e)}
                className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <li className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer">
                  Login
                </li>
              </NavLink>
              <NavLink to="/register">
                <li className="py-4 px-8 md:p-0 hover:bg-indigo-500 cursor-pointer">
                  Register
                </li>
              </NavLink>
            </>
          )}
        </ul>
        <div className="flex flex-row space-x-4 items-center text-white">
          <svg
            onClick={() => setIsopen(true)}
            className="w-6 h-6 cursor-pointer text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {isLoggedIn && (
            <NavLink to="/cart">
              <svg
                className="w-6 h-6 cursor-pointer text-white "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </NavLink>
          )}
          <svg
            onClick={() => setIsopen(true)}
            className="w-6 h-6 cursor-pointer text-white md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
