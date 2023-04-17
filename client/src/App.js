import React, { useState } from "react";
import { UserContext } from "./assets/components/context/UserContext";
import { SearchContext } from "./assets/components/context/SearchContext";
import { useEffect } from "react";
import Axios from "axios";
import Routes from "./assets/routes/routes";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("/api/v1/user")
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, [isLoggedIn]);
  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
      >
        <SearchContext.Provider value={{ search, setSearch }}>
          <Routes />
        </SearchContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
