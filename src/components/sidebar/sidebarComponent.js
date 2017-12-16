import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import Avatar from 'material-ui/Avatar';
import styles from './styles'
import {Link} from 'react-router-dom';

class sidebarComponent extends React.Component {
    state = {open: true};

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const {classes,userData} = this.props;

        return (
            <List className={classes.root} subheader={
                <ListSubheader>
                    <Avatar className={classes.purpleAvatar}>D</Avatar>
                    <h6>Welcome Back <br/> {userData.firstName} {userData.lastName}</h6>
                </ListSubheader>
            }>
                <ListItem button >
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Dentists"/>

                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Patients"/>
                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Visits"/>

                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Add Document"/>

                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Invoices"/>

                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Reports"/>

                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Visits"/>

                </ListItem>

            </List>
        );
    }
}

sidebarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(sidebarComponent);