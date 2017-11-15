import React, {Component} from 'react';
import _ from 'underscore';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {userRegister} from '../../../actions/index';
import {browserHistory} from 'react-router';
import {getAllDentists} from '../../../actions/account_actions';

import AddDentistComponent from './AddDentistComponent'
import DentistToolbar from './toolbar'
// material-UI and styles
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import styles from '../style.css';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Layout from '../../../routes/Layout'


class DentistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { users:'',addDentist:false,editDentist:false };

    }

    componentDidMount(){
        const {token} = this.props
        if(token) this.props.getAllDentists(token);
    }

    renderUsers(){
       return _.map(this.props.myAccount,(userList,key)=>{
           return(
               <ListItem
                    key = {key}
                    primaryText={userList.username}
                    rightIcon={<CommunicationChatBubble />}
                    onClick = {()=>{this.setState({users:userList})}}
                />
           )
       })
    }
    renderUserView(){

        return(
            <ul>
                <li>Username:{this.state.users.username}</li>
                <li>Email:{this.state.users.email}</li>
            </ul>

        )
        console.log(this.state.users.username)
    }

    render() {
        const {handleSubmit} = this.props;
        let currentView=null;
        if(this.state.addDentist) currentView=<AddDentistComponent />

        if(this.state.viewCurrentUser) currentView= this.renderUserView()

        if(this.state.editCurrentUser) currentView= this.renderUserView()
        return (
            <Layout title="MyAccountComponent page">
                    <DentistToolbar />
                    <div className='container-fluid' >

                        <div className='row' >
                           <div className="col-md-3">
                            <List>
                                <RaisedButton label="Add New Dentist" fullWidth={true} onClick={()=>{this.setState({addDentist:true})}} />
                                <Subheader>All Dentists</Subheader>
                                {this.renderUsers()}
                            </List>
                           </div>
                           <div className="col-md-9">
                              {currentView}
                           </div>
                        </div>
                    </div>
        </Layout>
    );
    }

}

function mapStateToProps({myAccount}){
    return {myAccount}
}
export default connect(mapStateToProps,{getAllDentists})(DentistComponent)
