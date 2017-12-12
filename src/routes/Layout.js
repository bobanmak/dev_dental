import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue400,white, darkBlack} from 'material-ui/styles/colors';
import HeaderAppComponent from '../components/header/HeaderAppComponent'
import SidebarComponent from '../components/sidebar/sidebarComponent'
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {layoutWidth: 0};
    }

    componentWillMount() {
        const layWidth = window.innerWidth - 255;
        const layHeight = window.innerHeight - 95;
        this.setState({layoutWidth: layWidth, layoutHeight: layHeight})
    }

    componentDidMount() {
        console.log(this.props)
    }


    render() {
        const style = {
            width: this.state.layoutWidth,
            height: this.state.layoutHeight,
            margin: "2px ",
            padding:"0 1rem"
        };
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: blue400,
                accent2Color: ' rgba(255, 255, 255, 0.1)',
                accent3Color: blue400,
                textColor: darkBlack,
                alternateTextColor: white,
            },
            appBar: {
                height: 60,
            },
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="layout">

                    <HeaderAppComponent />
                    <SidebarComponent userData={this.props.userId} userRoleId={this.props.userRoleId} />
                    <Paper className="main_content"   zDepth={0} style={style}>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>);
    }
}
