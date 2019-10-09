import React from 'react';
import './App.css';
import {CssBaseline, MuiThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { purple, green, grey}  from "@material-ui/core/colors";
import {BrowserRouter} from "react-router-dom";
import {ContextProvider} from "./Context";
import Nav from './Nav';

let theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#00bcd4',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});

theme = responsiveFontSizes(theme);

function App(props) {
    return (
        <ContextProvider>
            <CssBaseline />
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <Nav clicked={props.clicked}/>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;
