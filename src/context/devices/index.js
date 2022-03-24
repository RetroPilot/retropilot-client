import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import { listDevices } from '../../api/devices';

import ACTIONS from './actions';
import reducer from './reducer';

const initialState = {
  dongles: {},
};

const DevicesContext = createContext(initialState);

function DevicesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:81');

    ws.onmessage = ({ data }) => {
      const payload = JSON.parse(data);
      console.log('devices onmessage', payload);

      if (!payload.id) {
        dispatch({ type: ACTIONS.ADD_DATA, data: payload });
      }
    };

    listDevices().then((devices) => {
      console.log('devices store', devices);

      dispatch({ type: ACTIONS.FETCH_ALL_DONGLES, data: devices });
    }).catch(console.error);

    return () => {
      // Clean up the websocket
      try {
        ws.close();
      } catch (e) {
        // do nothing
      }
    };
  }, []);

  const contextValue = useMemo(() => ([state, dispatch]), [state, dispatch]);

  return (
    <DevicesContext.Provider value={contextValue}>
      { children }
    </DevicesContext.Provider>
  );
}

DevicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DevicesProvider;
export {
  ACTIONS,
  DevicesContext,
};
