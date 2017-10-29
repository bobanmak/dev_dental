import React, {Component} from 'react';
import Layout from '../Layout';
import LoginComponent from '../../components/auth/LoginComponent/LoginComponent';
export default class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Layout title="Login page">
                <LoginComponent></LoginComponent>
            </Layout>);
    }
}

