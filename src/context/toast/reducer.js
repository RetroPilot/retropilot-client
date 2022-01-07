const Reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_TOAST':
      return {
        ...state,
        open: action.open,
        msg: action.message
      };
    case 'CLOSE_TOAST':
      return {
        ...state,
        open: false
      }

    default:
      return state;
  }
};

export default Reducer;