import React, { createContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import ACTIONS from './actions';
import reducer from './reducer';

const initialState = {
  open: false,
  message: null,
};

const ToastContext = createContext(initialState);

function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ([state, dispatch]), [state, dispatch]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;
export {
  ACTIONS,
  ToastContext,
};
