import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Table, {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
    {id: 'firstName', numeric: false, disablePadding: false, label: 'First Name'},
    {id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'identificationNumber', numeric: true, disablePadding: false, label: 'Identification Number'},

];

class TblHeaderComponent extends React.Component {
    static propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>

                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
export default TblHeaderComponent