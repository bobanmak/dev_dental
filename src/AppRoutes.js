import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom'

import RouteAuth from './routes/auth/RouteAuth';
import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import MyAccountComponent from './components/account/MyAccountComponent';
import NotFound from './routes/NotFound';


export default class AppRoutes extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <Router >
                <div>
                    <Switch>
                    <RouteAuth canAccess={this.props.routeState.access} path="/my-account" name="test" component={MyAccountComponent} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/page1" component={Register} />
                    <Route path="/" component={Home} />
                    <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>

           );
    }
}
