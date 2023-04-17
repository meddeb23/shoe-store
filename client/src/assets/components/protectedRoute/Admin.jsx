import React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom"
import { UserContext } from '../context/UserContext';

export function Admin({ children, ...rest }) {
    const { isLoggedIn, user } = useContext(UserContext);
    console.log(user)
    return <Route {...rest}
        render={({ location }) =>
            isLoggedIn && user.isAdmin ? (
                children
            ) :
                <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
        }
    />
}
