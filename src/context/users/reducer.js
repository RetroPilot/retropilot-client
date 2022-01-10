import ACTIONS from './actions';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SIGN_OUT:
      return {
        ...state,
        active: !state.active,
      };

    default:
      return state;
  }
}

export default reducer;
