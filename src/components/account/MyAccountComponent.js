import React, {Component} from 'react';
import {connect} from  'react-redux';
import {myAccount} from '../../actions/account_actions';
import {browserHistory} from 'react-router';
import {getCookie} from '../../utils/cookies'



// material-UI and styles
import Paper from 'material-ui/Paper';
import styles from './style.css';
import Layout from '../../routes/Layout'

class MyAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  open: ""};

    }
    componentDidMount(){
        //const data=getCookie('udata') ? JSON.parse(getCookie('udata')) : false;
        console.log(this.props);
        //this.props.myAccount(data.token);
        //this.props.myAccount(this.props.token);
        //const parsed = JSON.parse(this.props.localData);
        //this.props.myAccount(token);
    }

    render() {
        console.log(this.props.accountInfo.username);
        return (
            <Layout title="MyAccountComponent page">
                <div className="myAccount">
                    <Paper className={styles.myAccount} zDepth={2}>
                           <div className="col-md-12">
                                <div className="col-md-6">Name</div>
                                <div className="col-md-6">{this.props.username}</div>
                            </div>
                    </Paper>
                </div>
            </Layout>
        );
    }

}
function mapStateToProps(state){
    return {accountInfo:state.myAccount}
}

export default connect(mapStateToProps,{myAccount})(MyAccountComponent);