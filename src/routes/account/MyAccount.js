import React, {Component} from 'react'
import {connect} from  'react-redux';


import Layout from '../Layout'
import MyAccountComponent from '../../components/account/MyAccountComponent'
import AddDentistComponent from '../../components/account/DentistComponent/DentistComponent'
import EditDentistRoleComponent from '../../components/account/EditDentistRoleComponent'
import {myAccount} from '../../actions/account_actions';

import {List, ListItem} from 'material-ui/List';

import styles from './style.css'

 class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state={currentView:"MY_ACCOUNT" }
    }

    componentDidMount(){

    }

    clcMyAccount(){
        this.props.myAccount(this.props.token);
        this.setState({currentView:"MY_ACCOUNT"})
    }
    render() {
        let renderTemplate=null;
        switch(this.state.currentView) {
            case "MY_ACCOUNT":
                renderTemplate=<MyAccountComponent />
                break;
            case "ADD_DENTIST":
                renderTemplate=<AddDentistComponent token={this.props.token} />
                break;
            case "EDIT_ROLES":
                renderTemplate=<EditDentistRoleComponent token={this.props.token} />
                break;
        }
        return (
            <Layout title="MyAccountComponent page">
                <div className={styles.myAcc}>
                    <div className="row">
                        <div className="col-md-3">
                            <Paper className={styles.paper}>
                                <List>
                                    <ListItem primaryText="My Account" onClick={()=>{this.clcMyAccount()}} />
                                    <ListItem primaryText="Add Dentist" onClick={()=>{this.setState({currentView:"ADD_DENTIST"})}} />
                                    <ListItem primaryText="Edit Dentist Role"   onClick={()=>{this.setState({currentView:"EDIT_ROLES"})}} />
                                </List>
                            </Paper>
                        </div>
                        <div className="col-md-9">
                            {renderTemplate}
                        </div>
                    </div>
                </div>

            </Layout>);
    }
}
function mapStateToProps({myAccount}){
    const accountInfo= myAccount[0];
    console.log(accountInfo);
    return {accountInfo}
}

export default connect(mapStateToProps,{myAccount})(MyAccount);
