import { grey } from 'material-ui/colors';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    appToolbar:{
        textAlign:"right",
        backgroundColor: grey[200],

    },
    btnIcons:{
        margin:'2px',
        color:grey[500]
    },
    button:{
        color:grey[500],
        padding:15,
    }

});

export default styles;