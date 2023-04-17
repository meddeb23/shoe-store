import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Redirect, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export function AuthRoute({ children, ...rest }) {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    )
}
