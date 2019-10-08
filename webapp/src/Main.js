import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Home';

const main = () => {
    return (
        <main>
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
        </main>
    )

};

export default main;