import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from  'react-redux';
import {getAllUsers} from '../../actions/dentists';
import DeleteDentistComponent from './DeleteDentistComponent'
import DentistToolbar from './toolbar'
import {deleteUser} from '../../actions/dentists';
import {Link, withRouter} from 'react-router-dom';

// material-UI and styles
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Layout from '../../routes/Layout'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
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
        this.state = {user: '', token: '', openDeleteDialog: false, resMessage: ''};
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
        //this.setState({openDeleteDialog: !this.state.openDeleteDialog, user: dentist, token: this.props.token});
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
     * renderUsers
     * @description Render list of table with all users
     */
    renderUsers() {
        return _.map(this.props.dentist, (dentist, key) => {
            return (
                <TableRow key={key}>
                    <TableRowColumn>{dentist.id}</TableRowColumn>
                    <TableRowColumn>{dentist.firstName} {dentist.lastName}</TableRowColumn>
                    <TableRowColumn>{dentist.email}</TableRowColumn>
                    <TableRowColumn>{dentist.licence}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="Edit" primary={true} onClick={() => {
                            this.openEditScreen(dentist)
                        }}/>
                        <RaisedButton label="Delete"
                                      onClick={() => {
                                          this.toggleCloseDialog(dentist)
                                      }}
                                      secondary={true}/>
                    </TableRowColumn>
                </TableRow>

            )
        })
    }


    /**
     * render
     * @description Render whole DentistList view
     */
    render() {
        return (
            <Layout title="MyAccountComponent page">
                <DentistToolbar />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <Table
                                selectable={false}>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>ID</TableHeaderColumn>
                                        <TableHeaderColumn>Dentist Name/Surname</TableHeaderColumn>
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Licence Number</TableHeaderColumn>
                                        <TableHeaderColumn>Actions</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.renderUsers()}
                                </TableBody>
                            </Table>
                            {this.state.openDeleteDialog ?
                                <DeleteDentistComponent token={this.state.token} user={this.state.user}
                                                        onDialogDelete={this.toggleDeleteDialog.bind(this)}
                                                        onDialogClose={this.toggleCloseDialog.bind(this)}/> : null}
                        </div>
                    </div>
                </div>
                {this.state.resMessage ?
                    <Snackbar open={true} message={this.state.resMessage} autoHideDuration={4000}/> : null}
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
export default withRouter(connect(mapStateToProps, {getAllUsers, deleteUser})(DentistListComponent))
