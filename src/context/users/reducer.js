export const reducer = (state, action) => {
  switch (action.type) {
    case 'sign_out':

      return {
        ...state,
        active: !state.active,
      };

    default:
      return state;
  }
};

export const initialState = {
  signedIn: false,
  user: {
    id: null,
    username: null,
    JWT: null,
  },
};
