import React, {Component} from 'react';
import Layout from '../../components/appShell/Layout';
import LoginComponent from '../../components/auth/LoginComponent/LoginComponent';
export default class Login extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <Layout title="Login page">
                <LoginComponent></LoginComponent>
            </Layout>);
    }
}

