// 

import React, { createContext, useEffect, useReducer } from "react"; // Add React import
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

/* Reads the data from the Provider and changes INITIAL_STATE */
export const AuthContext = createContext(INITIAL_STATE);

/* Children here are the Components that need to get the data. 
   In this Application, we specified App Component as Child in index.js so that we can serve every component in the app. */
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
