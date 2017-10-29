import React, {Component} from 'react';
import Layout from '../Layout';
import MyAccountComponent from '../../components/account/MyAccount/MyAccountComponent';
export default class MyAccount extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Layout title="MyAccountComponent page">
            <MyAccountComponent></MyAccountComponent>
            </Layout>);
    }
}

