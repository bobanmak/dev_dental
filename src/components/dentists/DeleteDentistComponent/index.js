import React, {Component} from 'react';
import {deleteUser} from '../../../actions/dentists/index';
import {connect} from  'react-redux';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

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

    render() {

        return (
            <div>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Delete  dentist with id {this.props.user.id} ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Are you sure that you want to do this. This process is irreversable
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.onDialogDelete} color="primary" >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteUser})(DeleteDentistComponent)