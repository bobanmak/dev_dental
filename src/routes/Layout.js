import React, {Component} from 'react';
import {connect} from  'react-redux';
import {withRouter} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HeaderAppComponent from '../components/header/HeaderAppComponent'
export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount(){

	}


	static propTypes = {
		title: React.PropTypes.string.isRequired
	};

    render() {

		return (
			<MuiThemeProvider>
				<div id="layout">
					<HeaderAppComponent />
					{this.props.children}
				</div>
			</MuiThemeProvider>);
	}
}
