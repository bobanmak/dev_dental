import React, {Component} from 'react';
import {getCookie} from '../../utils/cookies';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';

export default class HeaderAppComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            username: ""
        };
    }

    componentDidMount(){
       if(getCookie('udata')){
           const loginCookie=JSON.parse(getCookie('udata'));
           this.setState({logged:true,username:loginCookie.username})
       }
    }

    render(){
            return(
                <AppBar title={ this.props.title } className="appbar"  iconElementRight={this.state.logged ? <Logged /> : <Login />}/>
            )

        }
}
//loged menu
const Logged = (props) => (
    <IconMenu
    {...props}
    iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="My Account"  containerElement={<Link to="/my-account" />}  />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);
Logged.muiName = 'IconMenu';

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Login" />
    );
    }
}