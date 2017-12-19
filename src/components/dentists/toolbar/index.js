import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import styles from './styles'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {withStyles} from 'material-ui/styles';
import AddDentis from 'material-ui-icons/AddCircleOutline';
import ViewDentist from 'material-ui-icons/Contacts';
import {withRouter} from 'react-router-dom'
class DentistToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    /**
     * handleClick
     * @description Will redirect to the correct path using the react-router WithRouter history method
     * @param value The path in which you want to redirect the user to
     */
    handleClick(value) {
        if (value) {
            this.props.history.push(value);
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.appToolbar}>

                <Button  onClick={()=>{this.handleClick('/dentists')}} className={classes.button}><ViewDentist  className={classes.btnIcons}/>  View all Dentists</Button>
                <Button onClick={()=>{this.handleClick('/dentist/add')}} className={classes.button}><AddDentis className={classes.btnIcons}/>Add new Dentist</Button>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(DentistToolbar));