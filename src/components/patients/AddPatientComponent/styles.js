const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    insertPaper:{
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
    }
});

export default styles;