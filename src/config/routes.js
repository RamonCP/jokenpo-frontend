import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import {isAuthenticated} from './auth'

import Login from '../pages/Login/index'
import Game from '../pages/Game/index'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route  
        { ...rest } 
        render={ props => 
            isAuthenticated() ? (
                <Component { ...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        } 
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <Login/>}/>
            <PrivateRoute exact path="/game" component={() => <Game /> }/>
        </Switch>
    </BrowserRouter>
)

export default Routes