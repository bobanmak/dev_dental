import React from 'react';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import styles from './styles'
import {deleteCookie} from '../../utils/cookies'
class HeaderAppComponent extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleRequestClose = (value) => {
        this.setState({ anchorEl: null });
        this.props.history.push(value)
    };
    handleLogout=()=>{
        console.log('value')
        deleteCookie('udata')
        window.location.href='/'
    }

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const {openDrawer}=this.props
        return (
            <div className={classes.root}>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            aria-label="open drawer"
                            onClick={openDrawer}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="contrast"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onRequestClose={this.handleRequestClose}
                                >
                                    <MenuItem onClick={()=>{this.handleRequestClose('/my-account')}}>My account</MenuItem>
                                    <MenuItem onClick={()=>{this.handleRequestClose('/settings')}}>Settings</MenuItem>
                                    <MenuItem onClick={()=>{this.handleLogout()}}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(HeaderAppComponent));

