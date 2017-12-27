import React from 'react';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import toolbarStyles from './styles'

let EnhancedTableToolbar = props => {
    const {classes} = props;

    return (
        <Toolbar>
            <div className={classes.title}>
                    <Typography type="title">All Patients list</Typography>
            </div>
            <div className={classes.spacer}/>

        </Toolbar>
    );
};


export default withStyles(toolbarStyles)(EnhancedTableToolbar);