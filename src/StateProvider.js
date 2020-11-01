import React, { createContext, useContext, useReducer } from "react";

// createContext() - preparing the data layout where everything stays
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// allows us to pull info from the data layout
export const useStateValue = () => useContext(StateContext);
