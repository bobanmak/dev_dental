import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

export default class DentistToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <RaisedButton label="View All Dentists" primary={true} containerElement={<Link to="/dentists"/>} />
                    <RaisedButton label="Add New Dentist" primary={true}  containerElement={<Link to="/dentist/add"/>}/>
                </ToolbarGroup>
            </Toolbar>
    );
    }
}