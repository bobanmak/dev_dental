import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom'

import promise from 'redux-promise';
import {getCookie} from './utils/cookies';


import reducers from './reducers';
import AppRoutes from './AppRoutes';

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
                <AppRoutes routeState={this.state} />
            </Provider>);
    }

}
