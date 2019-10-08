import React from 'react';
import './App.css';
import {CssBaseline, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { purple, green, grey}  from "@material-ui/core/colors";
import {BrowserRouter} from "react-router-dom";
import {ContextProvider} from "./Context";
import Nav from './Nav';

let theme = createMuiTheme({
    palette: {
        primary: {main: purple[500]},
        secondary: {main: grey[500]},
    },
});

theme = responsiveFontSizes(theme);

function App(props) {
    return (
        <ContextProvider>
            <CssBaseline />
            <BrowserRouter>
                <themeProvider theme={theme}>
                    <div className="App">
                        <Nav clicked={props.clicked}/>
                    </div>
                </themeProvider>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;
