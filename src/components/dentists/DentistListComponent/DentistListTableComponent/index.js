import React from 'react';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import { CircularProgress } from 'material-ui/Progress';

import _ from 'underscore';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import EditDentist from 'material-ui-icons/ModeEdit';
import DeleteDentis from 'material-ui-icons/Clear';
import TblHeaderComponent from './TblHeaderComponent'
import EnhancedTableToolbar from './TblToolbarComponent'
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ListTableComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            order: 'asc',
            orderBy: 'firstName',
            selected: [],
            page: 0,
            rowsPerPage: 5,
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({data:nextProps.data})

    }
    /**
     * componentDidMount
     * @description Get Dentist data from the backend before the component is rendered
     */
    componentDidMount() {
        const {token} = this.props

    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };


    handleClick = (event, id) => {
        const { selected } = this.state;
        console.log(selected)
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render() {
        const { classes } = this.props;
        const {data} = this.props
        if (_.isEmpty(data)){
           return  <CircularProgress className={classes.progress} size={50} />
        }
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TblHeaderComponent
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={0}
                                        key={n.id}
                                    >
                                        <TableCell>{n.firstName}</TableCell>
                                        <TableCell>{n.lastName}</TableCell>
                                        <TableCell>{n.email}</TableCell>
                                        <TableCell>{n.licence}</TableCell>
                                        <TableCell>
                                            <Tooltip id="tooltip-icon" title="Edit this dentist" placement="bottom">
                                                <Button  mini color="primary" aria-label="edit" onClick={() => {
                                                    //this.openEditScreen(dentist)
                                                }}>
                                                    <EditDentist/>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Delete this dentist" placement="bottom">
                                                <Button  mini color="accent" aria-label="delete"
                                                        onClick={() => {
                                                            //this.toggleCloseDialog(dentist)
                                                        }}
                                                >
                                                    <DeleteDentis/>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}


export default withStyles(styles)(ListTableComponent)