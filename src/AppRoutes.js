import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {getTokenData} from './actions/account_actions'
import {connect} from  'react-redux';
import _ from 'underscore'
import RouteAuth from './routes/auth/RouteAuth';
import RouteAdmin from './routes/auth/RouteAdmin';
import Home from './routes/Home';
import NotAllowed from './routes/notAllowed'
import {getCookie} from './utils/cookies';

//auth routes
import Login from './routes/auth/Login';

//my account routes
import MyAccountComponent from './components/account/MyAccountComponent'

//dentist components
import DentistListComponent from './components/dentists/DentistListComponent'
import AddDentistComponent from './components/dentists/AddDentistComponent'
import EditDentistComponent from './components/dentists/EditDentistComponent'

//patient components
import PatientsListComponent from './components/patients/PatientListComponent'
import AddPatientComponent from './components/patients/AddPatientComponent'
import EditPatientComponent from './components/patients/EditPatientComponent'
import PatientProfileComponent from './components/patients/PatientProfileComponent'


import NotFound from './routes/NotFound';

class AppRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {access: true, token: "", userData: "", isAdmin: true};
    }

    componentDidMount() {
        const data = getCookie('udata') ? JSON.parse(getCookie('udata')) : false;
        if (data) {
            this.setState({access: true, token: data.token, userData: data.user_data});
            if(!_.contains(data.user_data.roles, 'isAdmin')){
                this.setState({isAdmin: false})
            }
        } else {
            this.setState({access: false});
        }
    }

    render() {
        const {access, userData, token,isAdmin} = this.state

        return (
            <Router>
                <div>
                    <Switch>
                        //my account routes
                        <RouteAuth exact canAccess={access} path="/my-account" token={token}
                                   userData={userData}
                                   component={MyAccountComponent}/>
                        //dentist related components
                        <RouteAdmin exact isAdmin={isAdmin} canAccess={access} path="/dentist/add" token={token}
                                   userData={userData}
                                   component={AddDentistComponent}/>

                        <RouteAdmin exact isAdmin={isAdmin} canAccess={access} path="/dentist/edit"
                                    token={token} userData={userData}
                                    component={EditDentistComponent}/>

                        <RouteAuth exact canAccess={access} path="/dentists" token={token}
                                   userData={userData}
                                   component={DentistListComponent}/>
                        //patient related components
                        <RouteAuth exact canAccess={access} path="/patients" token={token}
                                   userData={userData}
                                   component={PatientsListComponent}/>
                        <RouteAuth exact canAccess={access} path="/patient/add" token={token}
                                   userData={userData}
                                   component={AddPatientComponent}/>
                        <RouteAuth exact canAccess={access} path="/patient/edit" token={token}
                                   userData={userData}
                                   component={EditPatientComponent}/>
                        <RouteAuth exact canAccess={access} path="/patient/:id" token={token}
                                   userData={userData}
                                   component={PatientProfileComponent}/>
                        //auth routes
                        <RouteAuth exact canAccess={access} path="/" token={token}
                                   userData={userData}
                                   component={Home}/>
                        <RouteAuth exact canAccess={access} path="/notAllowed" token={token}
                                   userData={userData}
                                   component={NotAllowed}/>
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