import React from 'react';

const Context = React.createContext();

export const ContextProvider = ({children}) =>

    (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )

export const Consumer = Context.Consumer;

export default Context;