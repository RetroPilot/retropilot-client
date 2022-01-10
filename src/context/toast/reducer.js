import ACTIONS from './actions';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_TOAST:
      return {
        ...state,
        open: action.open,
        msg: action.message,
      };
    case ACTIONS.CLOSE_TOAST:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
}

export default reducer;
