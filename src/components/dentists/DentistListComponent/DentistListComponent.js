import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from  'react-redux';
import {getAllUsers} from '../../../actions/dentists/index';
import DeleteDentistComponent from '../DeleteDentistComponent/DeleteDentistComponent'
import DentistToolbar from '../toolbar/index'
import {deleteUser} from '../../../actions/dentists/index';
import {Link, withRouter} from 'react-router-dom';
import styles from './styles'

import ListTableComponent from './DentistListTableComponent'
// material-UI and styles
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import {withStyles} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Layout from '../../appShell/Layout'
import EditDentist from 'material-ui-icons/ModeEdit';
import DeleteDentis from 'material-ui-icons/Clear';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
/**
 * DentistListComponent
 * @description Component for displaying all dentists related to the current application
 */
class DentistListComponent extends Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {user: '', token: '', openDeleteDialog: false, resMessage: '',data:[]};
    }

    /**
     * componentDidMount
     * @description Get Dentist data from the backend before the component is rendered
     */
    componentDidMount() {
        const {token} = this.props
        /**
         * @type {function}
         * @param {string} token
         * @description  Get All data from Dentist Reducer if token is provided
         */
        if (token) this.props.getAllUsers(token);
    }

    /**
     * toggleCloseDialog
     * @description Will close the dialog
     * @param {object} dentist
     */
    toggleCloseDialog(dentist) {
        this.setState({openDeleteDialog: !this.state.openDeleteDialog, user: dentist, token: this.props.token});
    }

    /**
     * openEditScreen
     * @description Redirect to the edit component located in 'components/dentists/EditDentistComponent' and pass dentist data as parameter
     * @param {object} dentist
     */
    openEditScreen(dentist) {
        this.props.history.push({
            pathname: '/dentist/edit',
            state: {user: dentist}
        });
    }

    /**
     * toggleCloseDialog
     * @description Will close the dialog
     * @param {object} dentist
     */
    toggleDeleteDialog(dentist) {
        this.props.deleteUser(this.state.token, this.state.user.id, (message) => {
            if (message.status === 200) {
                this.setState({resMessage: message.data.message})
                this.props.getAllUsers(this.state.token)
            } else {
                this.setState({resMessage: 'Something went wrong.Please try again later'})
            }
            this.setState({openDeleteDialog: !this.state.openDeleteDialog})
        })

    }

    /**
     * render
     * @description Render whole DentistList view
     */
    render() {
        const {classes} = this.props;
        return (
            <Layout title="MyAccountComponent page" userData={this.props.userData} >
                <DentistToolbar />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <ListTableComponent data={this.props.dentist} order="asc" rowsPerPage={5} />
                            {this.state.openDeleteDialog ?
                                <DeleteDentistComponent token={this.state.token} user={this.state.user}
                                                        onDialogDelete={this.toggleDeleteDialog.bind(this)}
                                                        onDialogClose={this.toggleCloseDialog.bind(this)}/> : null}
                        </div>
                    </div>
                </div>
                {this.state.resMessage ? <Snackbar open={true} message={this.state.resMessage} autoHideDuration={4000}/> : null}
            </Layout>
        );
    }

}
/**
 * @type {function}
 * @param {object} dentist
 * @description  Return dentist data from the appropriate reducer
 * @return {object} dentist
 */
function mapStateToProps({dentist}) {
    return {dentist}
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, {getAllUsers, deleteUser})(DentistListComponent)))
