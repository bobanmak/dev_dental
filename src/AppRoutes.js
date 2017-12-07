import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {getTokenData} from './actions/account_actions'
import {connect} from  'react-redux';
import RouteAuth from './routes/auth/RouteAuth';
import Home from './routes/Home';

import {getCookie} from './utils/cookies';

//auth routes
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';

//my account routes
import MyAccountComponent from './components/account/MyAccount/MyAccountComponent'
import DentistListComponent from './components/dentists/DentistListComponent'
import AddDentistComponent from './components/dentists/AddDentistComponent'
import EditDentistComponent from './components/dentists/EditDentistComponent'
import NotFound from './routes/NotFound';

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}

class AppRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {access: true, token: ""};
    }

    componentDidMount() {
        const data = getCookie('udata') ? JSON.parse(getCookie('udata')) : false;
        if (data) {
            this.setState({access: true, token: data.token});
        } else {
            this.setState({access: false});
        }

    }

    render() {
        const {tokenData} = this.props;

        return (
            <Router>
                <div>
                    <Switch>
                        //my account routes
                        <RouteAuth exact canAccess={this.state.access} path="/my-account" userRoleID={tokenData.role_id}
                                   token={this.state.token} component={MyAccountComponent}/>
                        <RouteAuth exact canAccess={this.state.access} path="/dentists" token={this.state.token}
                                   userRoleID={tokenData}
                                   component={DentistListComponent}/>
                        <RouteAuth exact canAccess={this.state.access} path="/dentist/add" token={this.state.token}
                                   userRoleID={tokenData}
                                   component={AddDentistComponent}/>
                        <RouteAuth exact canAccess={this.state.access} path="/dentist/edit" token={this.state.token}
                                   userRoleID={tokenData}
                                   component={EditDentistComponent}/>
                        //auth routes
                        <Route exact path="/login" component={Login}/>

                        <Route path="/page1" component={Register}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}
function mapStateToProps({tokenData}) {
    return {tokenData}
}
export default connect(mapStateToProps, {getTokenData})(AppRoutes)