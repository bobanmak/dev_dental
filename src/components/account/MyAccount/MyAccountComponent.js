import React, {Component} from 'react';
import {connect} from  'react-redux';
import {myAccount} from '../../../actions/account_actions';
import {browserHistory} from 'react-router';
import {getCookie} from '../../../utils/cookies'
import {LocalAuthCheck} from '../../../actions/localData_actions';
import SingleAccount from './SingleAccount';
import AddDoctor from './AddDoctor';
// material-UI and styles
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styles from './style.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';



class MyAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  open: ""};

    }

    componentDidMount(){
        //const parsed = JSON.parse(this.props.localData);
        //this.props.myAccount(token);
    }

    render() {


        return (
            <div className="container" >
                <Paper className={styles.myAccount} zDepth={2}>
            <Tabs>
            <Tab label="My Account"  >
            <div>
                <SingleAccount />
            </div>
        </Tab>
            <Tab label="Add Dentist" />
            <Tab label="Edit Dentist Role"  disabled/>
            </Tabs>
                </Paper>

            </div>
        );
    }

}
function mapStateToProps({localData,myAccount}){
    return {localData,myAccount}
}


export default connect(mapStateToProps,{myAccount,LocalAuthCheck})(MyAccountComponent)