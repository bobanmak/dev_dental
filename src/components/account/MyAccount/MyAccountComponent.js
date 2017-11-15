import React, {Component} from 'react';
import {connect} from  'react-redux';
import {myAccount} from '../../../actions/account_actions';
import {browserHistory} from 'react-router';

// material-UI and styles
import Paper from 'material-ui/Paper';
import styles from '../style.css';
import Layout from '../../../routes/Layout'

class MyAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  open: ""};
    }
    componentDidMount(){

        const {token} = this.props
        if(token) this.props.myAccount(token);

    }
    componentWillReceiveProps(props) {
        // Update the chart with new data every time we receive props.

    }
    render() {

        return (
            <Layout title="MyAccountComponent page">
                <div className="myAccount">
                    <div className={styles.myAccount} >
                           <div className="row">
                                <div className="col-md-6">Name</div>
                                <div className="col-md-6">{this.props.accountInfo.username}</div>
                                <div className="col-md-6">Email</div>
                                <div className="col-md-6">{this.props.accountInfo.email}</div>
                            </div>
                    </div>
                </div>
            </Layout>
        );
    }

}
function mapStateToProps(state){
    return {accountInfo:state.myAccount}
}

export default connect(mapStateToProps,{myAccount})(MyAccountComponent);