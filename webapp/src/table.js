import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function DataTable(props) {
    console.log('Props in DataTable ', props);
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Database Name</TableCell>
                        <TableCell align="right">Application Name</TableCell>
                        <TableCell align="right">Environment</TableCell>
                        <TableCell align="right">Host Name</TableCell>
                        <TableCell align="right">Database Role</TableCell>
                        <TableCell align="right">DC Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, id) => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {id+1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.database_name}
                            </TableCell>
                            <TableCell align="right">{row.application_name}</TableCell>
                            <TableCell align="right">{row.environment}</TableCell>
                            <TableCell align="right">{row.host_name}</TableCell>
                            <TableCell align="right">{row.database_role}</TableCell>
                            <TableCell align="right">{row.dc_location}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
