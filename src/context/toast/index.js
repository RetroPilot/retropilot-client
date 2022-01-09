import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

const initialState = {
  open: false,
  message: null,
};

function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <context.Provider value={[state, dispatch]}>
      {children}
    </context.Provider>
  );
}

export const context = createContext(initialState);
export default Store;
