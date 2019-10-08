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
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = React.useState('database_name');
    const [searchValue, setSearchValue] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [tableData, setTableData] = React.useState(null);
    const handleChange = event => {
        setSelectedItem(event.target.value);
    };

    const onSearch = event => {
        setSearchValue(event.target.value);
    };

    const submitHandler = event => {
        event.preventDefault();
        if (searchValue !== '') {
            axios.get(URL_CONSTANTS.getRecordAPI + "" + selectedItem + "/" + searchValue)
                .then(res => {
                    console.log(res.data)
                    if(res.data){
                        setTableData(res.data)
                    }
                })
                .catch()
        } else {
            setErrorMsg('Please check the input...')
        }
    };

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
                    {errorMsg !== '' || searchValue !== '' ? <span color="red">{errorMsg}</span> : null}
                    <div className={classes.search}>
                        <TextField
                            id="outlined-search"
                            label={"Search by "+selectedItem}
                            type="search"
                            className={classes.textField}
                            margin-left="normal"
                            variant="outlined"
                            onChange={onSearch}
                        />
                        <Link
                            underline='none'
                            onClick={submitHandler}
                        >
                            <Button disabled={searchValue === ''}  variant="contained">
                                Search
                            </Button>
                        </Link>
                    </div>
                </FormControl>
            </form>
            { tableData && tableData.length > 0 ? <DataTable rows={tableData}/> : null }
        </React.Fragment>
    );
}
