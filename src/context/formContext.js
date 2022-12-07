import React, { useReducer, createContext } from 'react';

export const FormContext = createContext();

const initialState = {};

const reducer = {};

export const FormContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <FormContext.Provider value={[state, dispatch]}>{props.children}</FormContext.Provider>;
};
