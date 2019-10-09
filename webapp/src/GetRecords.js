import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {Link, Button, TextField} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import * as URL_CONSTANTS from './URL_CONSTANTS';
import axios from 'axios';
import DataTable from './table';
import CircularIndeterminate from './Loader';
import CustomizedSnackbars from './Snackbars';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch'
    },
    margin: {
        margin: theme.spacing(1),
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
        display: 'flex'

    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }

}));

export default function GetRecords() {

    const buildSnackbarObject = (open, variant, message, ) => {
        return {
            open: open,
            variant: variant,
            message: message
        }
    };

    const classes = useStyles();
    const [selectedItem, setSelectedItem] = React.useState('database_name');
    const [searchValue, setSearchValue] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [tableData, setTableData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [snackBarObject, setSnackBar] = React.useState(buildSnackbarObject(false, '', ''));

    const handleChange = event => {
        setSelectedItem(event.target.value);
    };

    const onSearch = event => {
        setSearchValue(event.target.value);
    };

    const clearHandler = () => {
        setTableData(null);
        setSearchValue('');
    };

    const onCloseSnackBar = () => {
        setSnackBar(buildSnackbarObject(false, 'info', ''))
    };

    const submitHandler = event => {
        setTableData(null);
        setLoading(true);
        event.preventDefault();
        if (searchValue !== '') {
            axios.get(URL_CONSTANTS.getRecordAPI + "" + selectedItem + "/" + searchValue)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        setSnackBar(buildSnackbarObject(true, 'success', 'Success'));
                        setLoading(false);
                        setTableData(res.data)
                    }
                })
                .catch(err => {
                    console.log("Error loading data ", err);
                    setSnackBar(buildSnackbarObject(true, 'error', 'Error getting records'));
                    setLoading(false)
                })
        } else {
            setSnackBar(buildSnackbarObject(true, 'info', 'Please enter valid search field'));
            setLoading(false);
        }
    };

    let content = loading ?
        <div>
            <span>Loading...</span>
            <CircularIndeterminate/>
        </div>
        :
        (tableData && tableData.length > 0) ?
            <DataTable rows={tableData}/>
            :
            null
    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off" onSubmit={submitHandler}>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="select-customized-select">Select</InputLabel>
                    <Select
                        value={selectedItem}
                        onChange={handleChange}
                        input={<BootstrapInput name="age" id="age-customized-select"/>}
                    >
                        <MenuItem value={'database_name'}>Database Name</MenuItem>
                        <MenuItem value={'application_name'}>Application Name</MenuItem>
                        <MenuItem value={'host_name'}>Host Name</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.margin}>
                    <div className={classes.grow}/>
                    {errorMsg !== '' || searchValue !== '' ? <span>{errorMsg}</span> : null}
                    <div className={classes.search}>
                        <TextField
                            id="outlined-search"
                            label={"Search by " + selectedItem}
                            type="search"
                            value={searchValue}
                            className={classes.textField}
                            margin-left="normal"
                            variant="outlined"
                            onChange={onSearch}
                        />
                        <Link
                            underline='none'
                            aria-disabled={searchValue === ''}
                            disabled={searchValue === ''}
                            onClick={submitHandler}
                        >
                            <Button                             className={classes.textField}
                                                                disabled={searchValue === ''} color="secondary" variant="contained">
                                Search
                            </Button>
                        </Link>

                        <Link
                            underline='none'
                            aria-disabled={searchValue === ''}
                            disabled={searchValue === ''}
                            onClick={clearHandler}
                        >
                            <Button                             className={classes.textField}
                                                                disabled={searchValue === ''} color="secondary" variant="contained">
                                Clear
                            </Button>
                        </Link>
                    </div>
                </FormControl>
            </form>
            {content}
            <CustomizedSnackbars
                closeSnackBar={onCloseSnackBar}
                snackBarObject={snackBarObject}
            />
        </React.Fragment>
    );
}
