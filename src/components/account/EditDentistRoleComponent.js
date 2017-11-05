import React, {Component} from 'react';
// material-UI and styles
import Paper from 'material-ui/Paper';
import styles from './style.css';

class EditDentistRoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="myAccount">
                <Paper className={styles.myAccount} zDepth={2}>
                    EditDentistRoleComponent
                </Paper>
            </div>
    )
        ;
    }

}

export default EditDentistRoleComponent;