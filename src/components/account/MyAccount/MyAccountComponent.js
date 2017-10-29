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
    componentWillMount(){
        //this.getCookie('udata');
        console.log(this.props);
    }

    render() {

        return (
            <div className="container" >
                <Paper className={styles.myAccount} zDepth={2}>
            <Tabs>
            <Tab label="My Account"  >
            <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
        <p>
        This is another example of a controllable tab. Remember, if you
            use controllable Tabs, you need to give all of your tabs values or else
        you wont be able to select them.
        </p>
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
function mapStateToProps({localData}){
    return {localData}
}

export default connect(mapStateToProps,{myAccount,LocalAuthCheck})(MyAccountComponent)