import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom'

import RouteAuth from './routes/auth/RouteAuth';
import Home from './routes/Home';
import {getCookie} from './utils/cookies';

//auth routes
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';

//my account routes
import MyAccountComponent from './components/account/MyAccount/MyAccountComponent'
import DentistComponent from './components/account/DentistComponent/DentistComponent'
import AddDentistComponent from './components/account/DentistComponent/AddDentistComponent'
import EditDentistRoleComponent from './components/account/EditDentistRoleComponent'
import NotFound from './routes/NotFound';

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
}}/>
);
}

export default class AppRoutes extends Component {
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
            <Router >
                <div>
                    <Switch>
                    //my account routes
                    <RouteAuth exact canAccess={this.state.access} path="/my-account"  userRoleID='3' token={this.state.token} component={MyAccountComponent} />
                    <RouteAuth exact canAccess={this.state.access} path="/my-account/dentists" token={this.state.token} component={DentistComponent} />

                    <RouteAuth exact canAccess={this.state.access} path="/dentists"/>
                    //auth routes
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/page1" component={Register} />
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>

           );
    }
}
