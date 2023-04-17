import React from 'react';
import {Route, Redirect} from "react-router-dom"

export default function Auth({user, path, route }) {
    return user  ? 
    <Route exact path={path} component={route}/> 
    : <Redirect to="/login"/>
        
    
}
