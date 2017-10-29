import React, {Component} from 'react';
import Layout from '../Layout';
import RegisterComponent from '../../components/auth/RegisterComponent/RegisterComponent';
export default class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Layout title="Register page">
                <RegisterComponent></RegisterComponent>
            </Layout>);
    }
}

