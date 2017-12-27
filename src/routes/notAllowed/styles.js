import { red } from 'material-ui/colors';
const styles = theme => ({
    card: {
        minWidth: 400,
    },
    root: {
        flexGrow: 1,
    },
    demo: {
        height: window.outerHeight-200,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    errorText:{
        color:red[400]
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});
export default styles;