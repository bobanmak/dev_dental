import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {getTokenData} from './actions/account_actions'
import {connect} from  'react-redux';
import RouteAuth from './routes/auth/RouteAuth';
import Home from './routes/Home';

import {getCookie} from './utils/cookies';

//auth routes
import Login from './routes/auth/Login';

//my account routes
import MyAccountComponent from './components/account/MyAccountComponent'
import DentistListComponent from './components/dentists/DentistListComponent/DentistListComponent'
import AddDentistComponent from './components/dentists/AddDentistComponent/AddDentistComponent'
import EditDentistComponent from './components/dentists/EditDentistComponent/EditDentistComponent'
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
        this.state = {access: true, token: "", userData:""};
    }

    componentDidMount() {
        const data = getCookie('udata') ? JSON.parse(getCookie('udata')) : false;
        if (data) {
            this.setState({access: true, token: data.token,userData:data.user_data});
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
                        <RouteAuth exact canAccess={this.state.access} path="/my-account" token={this.state.token}
                                   userData={this.state.userData}
                                   component={MyAccountComponent}/>

                        <RouteAuth exact canAccess={this.state.access} path="/dentist/add" token={this.state.token}
                                   userData={this.state.userData}
                                   component={AddDentistComponent}/>

                        <RouteAuth  canAccess={this.state.access} path="/dentist/edit" token={this.state.token}  userData={this.state.userData}
                                   component={EditDentistComponent}/>

                        //dentist related components
                        <RouteAuth exact canAccess={this.state.access} path="/dentists" token={this.state.token}
                                   userData={this.state.userData}
                                   component={DentistListComponent}/>
                        //auth routes
                        <RouteAuth exact canAccess={this.state.access} path="/" token={this.state.token}
                                   userData={this.state.userData}
                                   component={Home}/>
                        <Route exact path="/login" component={Login}/>
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