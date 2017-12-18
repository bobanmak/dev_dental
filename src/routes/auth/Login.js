import React, {Component} from 'react';
import LoginComponent from '../../components/auth/LoginComponent/LoginComponent';
export default class Login extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){

    }
    render() {
        return (
           <div>
                <LoginComponent></LoginComponent>
            </div>);
    }
}

