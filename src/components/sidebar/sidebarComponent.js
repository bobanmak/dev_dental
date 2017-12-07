import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';


export default class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <Drawer docked={true} width={300} open={true} className="sidebarMenu">
                <AppBar title="Dentalniov"/>

                <List>
                    <ListItem primaryText="Visits" leftIcon={<ContentSend />}
                              containerElement={<Link to="/register"/>}/>
                    <ListItem
                        primaryText="Patients"
                        leftIcon={<ContentInbox />}
                        initiallyOpen={false}
                        containerElement={<Link to="/my-account"/>}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                                primaryText="View Patients"
                                leftIcon={<ActionGrade />}
                            />,
                            <ListItem
                                key={2}
                                primaryText="Edit Patient"
                                leftIcon={<ContentSend />}
                                disabled={true}

                            />,
                            <ListItem
                                key={3}
                                primaryText="Inbox"
                                leftIcon={<ContentInbox />}
                                open={this.state.open}
                                onNestedListToggle={this.handleNestedListToggle}

                            />,
                        ]}
                    />
                    <ListItem
                        primaryText="Dentists"
                        leftIcon={<ContentInbox />}
                        initiallyOpen={false}
                        containerElement={<Link to="/dentists"/>}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                                primaryText="Add Dentist"
                                leftIcon={<ActionGrade />}
                                containerElement={<Link to="/dentists"/>}
                            />,
                            <ListItem
                                key={2}
                                primaryText="View All Dentists"
                                leftIcon={<ContentSend />}
                                containerElement={<Link to="/dentists/add"/>}
                            />,
                            <ListItem
                                key={3}
                                primaryText="Inbox"
                                leftIcon={<ContentInbox />}
                                open={this.state.open}
                                onNestedListToggle={this.handleNestedListToggle}

                            />,
                        ]}
                    />
                    <ListItem
                        primaryText="My Account"
                        leftIcon={<ContentInbox />}
                        initiallyOpen={false}
                        containerElement={<Link to="/my-account"/>}
                    />
                    <ListItem primaryText="Services" leftIcon={<ContentDrafts />}/>
                    <ListItem primaryText="Billing" leftIcon={<ContentDrafts />}/>
                </List>
            </Drawer>
        )
    }
}
