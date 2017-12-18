import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import grey from 'material-ui/colors/grey';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        height: '100vh',
        background: grey[100],
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    centeredText: {
        textAlign: 'center',
    },
    avatar: {

    },
    purpleAvatar: {
        margin: '10px auto',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default styles