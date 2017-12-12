import React, {Component} from 'react';
import {connect} from  'react-redux';
import {getSingleUser} from '../../actions/dentists';


// material-UI and styles

import styles from './style.css';
import Layout from '../../routes/Layout'
import Paper from 'material-ui/Paper';

class MyAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: ""};
    }

    componentDidMount() {

        const {token,userId} = this.props

        if (token && userId) this.props.getSingleUser(token,userId);

    }



    render() {

        return (
            <Layout {...this.props} title="MyAccountComponent page">
                <div className="myAccount">
                    <div className={styles.myAccount}>
                        <div className="row">

                            <div className="col-md-6">
                                <Paper zDepth={1} className={styles.myAccountPaper} >
                                    <div className="row">
                                        <div className="col-md-12">

                                            <ul className="list-group">
                                                <li className="list-group-item">Username : <span>{this.props.dentist.username}</span></li>
                                                <li className="list-group-item">First Name:<span>{this.props.dentist.firstName}</span></li>
                                                <li className="list-group-item">Last Name :<span>{this.props.dentist.lastName} </span></li>
                                                <li className="list-group-item">Email: <span>{this.props.dentist.email}</span></li>
                                                <li className="list-group-item">Street Address:<span>{this.props.dentist.address}</span> </li>
                                                <li className="list-group-item">City:<span>{this.props.dentist.city}</span> </li>
                                                <li className="list-group-item">Country:<span>{this.props.dentist.country}</span> </li>
                                                <li className="list-group-item">Licence Number:<span>{this.props.dentist.licence}</span> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

}
function mapStateToProps({dentist}) {
    return {dentist}
}

export default connect(mapStateToProps, {getSingleUser})(MyAccountComponent);