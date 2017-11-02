import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom'

import promise from 'redux-promise';
import {getCookie} from './utils/cookies';


import {LocalAuthCheck} from './actions/localData_actions';
import reducers from './reducers';

import RouteAuth from './routes/auth/RouteAuth';
import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import MyAccount from './routes/account/MyAccount';
import NotFound from './routes/NotFound';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const createStoreWithMiddleware = createStore(reducers, applyMiddleware(promise));

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={access:true,token:""};

    }
    componentDidMount(){

        const data=getCookie('udata') ? JSON.parse(getCookie('udata')) : false;

        if(data) {
            this.setState({access:true,token:data.token});
        }else {
            this.setState({access:false});
        }

    }
    render() {
        return (
            <Provider store={createStoreWithMiddleware}>
            <Router >
                <div>
                    <Switch>
                    <RouteAuth canAccess={this.state.access} path="/my-account" name="test" component={()=><MyAccount token={this.state.token} />} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/page1" component={Register} />
                    <Route path="/" component={Home} />
                    <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>

            </Provider>);
    }

}
