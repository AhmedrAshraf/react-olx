import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from './apphistory';
import Signup from './components/signup';
import Signin from './components/signin';
import Home from './components/home';
import Sell from './components/sell';





class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/sellpage" component={Sell} />
                </div>
            </Router>
        )
    }
}

export default Routers;