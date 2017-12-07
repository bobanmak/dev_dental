import React, {Component} from 'react';
import {deleteUser} from '../../actions/dentists';
import {connect} from  'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



/**
 * DeleteDentistComponent
 * @description Component for displaying modal dialog for removing dentist
 */
class DeleteDentistComponent extends Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    /**
     * componentDidMount
     * @description Get Dentist data from the backend before the component is rendered
     */
    componentDidMount() {
        this.setState({open: true})
    }

    /**
     * handleUserDelete
     * @description Will call  deleteUser() action which will delete the user from the database
     */
    handleUserDelete = () =>  {
        this.props.deleteUser(this.props.token,this.props.user.id,(callback)=>{
            this.setState({open: false})
        })
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onDialogClose}
            />,
            <FlatButton
                label="Delete"
                secondary={true}
                onClick={this.props.onDialogDelete}
            />,
        ];

        return (
            <div>
                <Dialog
                    title='Delete User'
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                >
                    Do you really want to delete {this.props.user.email}
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteUser})(DeleteDentistComponent)