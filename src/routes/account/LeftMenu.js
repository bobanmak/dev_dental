import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Paper from 'material-ui/Paper';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from './style.css'

const LeftMenu = () => (
<Paper className={styles.paper}>
    <List>
    <ListItem primaryText="My Account" leftIcon={<ContentInbox />} />
    <ListItem primaryText="Add Dentist" leftIcon={<ActionGrade />} />
    <ListItem primaryText="Edit Dentist Role" leftIcon={<ContentSend />} />

    </List>
</Paper>
);

export default LeftMenu;