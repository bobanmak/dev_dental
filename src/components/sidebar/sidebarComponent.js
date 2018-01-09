import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import _ from 'underscore'
import {withStyles} from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import Avatar from 'material-ui/Avatar';
import styles from './styles'
/**
 * sidebarComponent
 * @description Sidebar Component with menu which is called in every component
 */
class sidebarComponent extends Component {

    /**
     * constructor
     * @description Sidebar Component with menu which is called in every component
     * @param props Properties of the component
     */
    constructor(props) {
        super(props);
        this.state = {open: true, isAdmin: true, isUser: true, isPatient: true};
    }

    componentDidMount() {
        const {userData} = this.props
        if (userData) {
            if (_.contains(userData.roles, 'isAdmin')) {

                this.setState({isAdmin: false})

            } else if (_.contains(userData.roles, 'isPatient')) {

                this.setState({isPatient: false})

            } else if (_.contains(userData.roles, 'isUser')) {

                this.setState({isUser: false})

            }

        }
    }

    /**
     * handleClick
     * @description Will redirect to the correct path using the react-router WithRouter history method
     * @param value The path in which you want to redirect the user to
     */
    handleClick(value) {
        this.setState({open: !this.state.open});
        if (value) {
            this.props.history.push(value);
        }
    }

    /**
     * render
     * @description Render function that will display the sidebar when this component will be called
     *
     */
    render() {
        const {classes, userData} = this.props;

        return (
            <List className={classes.root} subheader={
                <ListSubheader className={classes.centeredText}>
                    <Avatar className={classes.purpleAvatar}>D</Avatar>
                    <h6>Welcome Back <br/> {userData.firstName} {userData.lastName}</h6>
                </ListSubheader>
            }>
                <ListItem button onClick={() => {
                    this.handleClick('/dentists')
                }}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Dentists"/>
                </ListItem>

                <ListItem button disabled={this.state.isAdmin} onClick={() => {
                    this.handleClick('/patients')
                }}>
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

export default withRouter(withStyles(styles)(sidebarComponent));