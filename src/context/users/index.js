import React, { createContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import ACTIONS from './actions';
import reducer from './reducer';

const initialState = {
  signedIn: false,
  user: {
    id: null,
    username: null,
    JWT: null,
  },
};

const UserContext = createContext(initialState);

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ([state, dispatch]), [state, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
export {
  ACTIONS,
  UserContext,
};
