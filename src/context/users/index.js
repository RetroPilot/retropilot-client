import React from 'react';
import { reducer, initialState } from './reducer';

export const UserContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      { children }
    </UserContext.Provider>
  );
}
