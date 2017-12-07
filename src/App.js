import React,{Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


import promise from 'redux-promise';

import reducers from './reducers';
import AppRoutes from './AppRoutes';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const createStoreWithMiddleware = createStore(reducers, applyMiddleware(promise));

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={createStoreWithMiddleware}>
                <AppRoutes  />
            </Provider>);
    }

}
