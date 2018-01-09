import React, {Component} from 'react';
import {connect} from  'react-redux';
import {getAllPatients, deletePatient} from '../../../actions/patients';
import DeletePatientComponent from '../DeletePatientComponent'
import PatientToolbar from '../toolbar/index'

import {withRouter} from 'react-router-dom';
import styles from './styles'

import ListTableComponent from './PatientListTableComponent'
// material-UI and styles

import {withStyles} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Layout from '../../appShell/Layout'

/**
 * DentistListComponent
 * @description Component for displaying all patients related to the current application
 */
class PatientListComponent extends Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {user: '', token: '', openDeleteDialog: false, resMessage: '', data: [], open: true};
    }

    /**
     * componentDidMount
     * @description Get Dentist data from the backend before the component is rendered
     */
    componentDidMount() {
        const {token, userData} = this.props

        /**
         * @type {function}
         * @param {string} token
         * @description  Get All data from Dentist Reducer if token is provided
         */
        if (token && userData.user_id) this.props.getAllPatients(token, userData.user_id);
    }

    /**
     * toggleCloseDialog
     * @description Will close the dialog
     * @param {object} patient
     */
    toggleCloseDialog = (patient) => {
        this.setState({openDeleteDialog: !this.state.openDeleteDialog, user: patient, token: this.props.token});
    }

    /**
     * openEditScreen
     * @description Redirect to the edit component located in 'components/patients/EditDentistComponent' and pass patient data as parameter
     * @param {object} patient
     */
    openEditScreen = (patient) => {
        this.props.history.push({
            pathname: '/patient/edit',
            state: {user: patient}
        });
    }

    viewPatientProfile = (id) => {
        this.props.history.push(`/patient/${id}`)
    }

    /**
     * toggleDeleteDialog
     * @description Will close the dialog
     * @param {object} patient
     */
    toggleDeleteDialog = () => {
        const {token, userData} = this.props
        this.props.deletePatient(this.state.token, this.state.user.id, (message) => {
            if (message.status === 200) {
                this.setState({resMessage: message.data.message})
                this.props.getAllPatients(token, userData.user_id)
            } else {
                this.setState({resMessage: 'Something went wrong.Please try again later'})
            }
            this.setState({openDeleteDialog: !this.state.openDeleteDialog})
        })

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    /**
     * render
     * @description Render whole DentistList view
     */
    render() {
        const {patient, userData} = this.props;

        return (
            <Layout title="MyAccountComponent page" userData={userData}>
                <PatientToolbar />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <ListTableComponent data={patient} order="asc" editData={this.openEditScreen}
                                                viewPatientProfile={this.viewPatientProfile}
                                                deleteData={this.toggleCloseDialog} rowsPerPage={5}/>
                            {this.state.openDeleteDialog ?
                                <DeletePatientComponent token={this.state.token} user={this.state.user}
                                                        onDialogDelete={this.toggleDeleteDialog.bind(this)}
                                                        onDialogClose={this.toggleCloseDialog.bind(this)}/> : null}
                        </div>
                    </div>
                </div>
                {this.state.resMessage ?
                    <Snackbar open={this.state.open} message={this.state.resMessage} onRequestClose={this.handleClose}
                              autoHideDuration={2000}/> : null}
            </Layout>
        );
    }

}
/**
 * @type {function}
 * @param {object} patient
 * @description  Return patient data from the appropriate reducer
 * @return {object} patient
 */
function mapStateToProps({patient}) {
    return {patient}
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, {
    getAllPatients,
    deletePatient
})(PatientListComponent)))
