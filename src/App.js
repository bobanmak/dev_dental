import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import promise from 'redux-promise';
import {getCookie} from './utils/cookies';

import {LocalAuthCheck} from './actions/localData_actions';
import reducers from './reducers';
import Home from './routes/Home';
import EnsureLoggedInContainer from './routes/EnsureLoggedInContainer';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import MyAccount from './routes/account/MyAccount';
import NotFound from './routes/NotFound';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const createStoreWithMiddleware = createStore(
    reducers,
    // applyMiddleware() tells createStore() how to handle middleware
    applyMiddleware(promise)
)
export default class App extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        const data= getCookie('udata');
        let store = createStore(reducers);
        createStoreWithMiddleware.dispatch(LocalAuthCheck(data));
    }
    render() {

        return (
            <Provider store={createStoreWithMiddleware}>

                <Router history={browserHistory}>
                    <Route path="/" >
                        <IndexRoute component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/my-account" component={MyAccount} />
                        <Route path="/page1" component={Home}/>
                        <Route path="*" component={NotFound}/>
                    </Route>
                </Router>
            </Provider>);
    }

}
