import React, {Component} from 'react'
import Layout from '../Layout'
import MyAccountComponent from '../../components/account/MyAccount/MyAccountComponent'



import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Paper from 'material-ui/Paper';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from './style.css'

export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state={MyAccount:true,AddDentist:false,EditDentistRole:false}
    }
    componentDidMount(){

    }
    render() {

        return (
            <Layout title="MyAccountComponent page">
                <div className={styles.myAcc}>
                    <div className="row">
                        <div className="col-md-3">
                            <Paper className={styles.paper}>
                                <List>
                                    <ListItem primaryText="My Account" leftIcon={<ContentInbox />} onClick={()=>{this.setState({MyAccount:true})}} />
                                    <ListItem primaryText="Add Dentist" leftIcon={<ActionGrade />} onClick={()=>{this.setState({AddDentist:true})}} />
                                    <ListItem primaryText="Edit Dentist Role" leftIcon={<ContentSend />}  onClick={()=>{this.setState({EditDentistRole:true})}} />
                                </List>
                            </Paper>
                        </div>
                        <div className="col-md-9">
                        <MyAccountComponent token={this.props.token} ></MyAccountComponent>
                        </div>
                    </div>
                </div>

            </Layout>);
    }
}

