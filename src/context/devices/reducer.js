import ACTIONS from './actions';

function process(state, action) {
  if (action.type !== ACTIONS.ADD_DATA) {
    return state;
  }

  switch (action.data.command) {
    case 'dongle_status':
      return {
        ...state,
        dongles: {
          ...state.dongles,
          [action.data.data.dongle_id]: {
            ...state.dongles[action.data.data.dongle_id],
            online: action.data.data.online,
            last_seen: action.data.data.time,
            dongle_id: action.data.data.dongle_id,
          },
        },
      };
    default:
      return state;
  }
}

function reducer(state, action) {
  console.log('input', state, action);
  switch (action.type) {
    case ACTIONS.ADD_DATA:
      return process(state, action);

    case ACTIONS.FETCH_ALL_DONGLES:
      console.log('fetch', action);
      return {
        ...state,
        dongles: action.data,
      };

    case ACTIONS.UPDATE_DONGLE_DRIVES:
      return {
        ...state,
        dongles: {
          ...state.dongles,
          [action.dongle_id]: {
            ...state.dongles[action.dongle_id],
            drives: action.drives,
          },
        },
      };

    case ACTIONS.UPDATE_DONGLE_BOOTLOGS:
      return {
        ...state,
        dongles: {
          ...state.dongles,
          [action.dongle_id]: {
            ...state.dongles[action.dongle_id],
            boot: action.bootlogs,
          },
        },
      };

    case ACTIONS.UPDATE_DONGLE_CRASHLOGS:
      return {
        ...state,
        dongles: {
          ...state.dongles,
          [action.dongle_id]: {
            ...state.dongles[action.dongle_id],
            crash: action.crashlogs,
          },
        },
      };

    case ACTIONS.USER_AUTHENTICATION:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}

export default reducer;
