import { createContext } from "react";

export const UserContext = createContext({
    user:{},
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})