import React from 'react';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AddDentis from 'material-ui-icons/AddCircleOutline';
import ViewDentis from 'material-ui-icons/Contacts';

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
                    <FlatButton   icon={<ViewDentis />}  label="View All Dentists" primary={true} containerElement={<Link to="/dentists"/>} />
                    <FlatButton  icon={<AddDentis />} label="Add New Dentist" primary={true}  containerElement={<Link to="/dentist/add"/>}/>
                </ToolbarGroup>
            </Toolbar>
    );
    }
}