import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import styles from './styles'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {withStyles} from 'material-ui/styles';
import AddDentis from 'material-ui-icons/AddCircleOutline';
import ViewDentis from 'material-ui-icons/Contacts';

class DentistToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button className={classes.button}>View all Dentists</Button>
                <Button className={classes.button}>Add new Detist</Button>
            </div>
        );
    }
}

export default withStyles(styles)(DentistToolbar);