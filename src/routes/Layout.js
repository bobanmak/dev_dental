import React, {Component} from 'react';
import {connect} from  'react-redux';
import {withRouter} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HeaderAppComponent from '../components/header/HeaderAppComponent'
import SidebarComponent from '../components/sidebar/sidebarComponent'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Paper from 'material-ui/Paper';

import ActionInfo from 'material-ui/svg-icons/action/info';
export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {layoutWidth:0};
	}
	componentWillMount(){
		const layWidth= window.innerWidth - 320;
		const layHeight= window.innerHeight - 85;
		this.setState({layoutWidth:layWidth,layoutHeight:layHeight})
	}
	componentDidMount(){

	}


    render() {
        const style = {
            width: this.state.layoutWidth,
			height:  this.state.layoutHeight,
			margin: "10px "
        };
		return (
			<MuiThemeProvider>
				<div id="layout">

					<HeaderAppComponent />
					<SidebarComponent />
					<Paper className="main_content" style={style}>
            			{this.props.children}
					</Paper>
				</div>
			</MuiThemeProvider>);
	}
}
