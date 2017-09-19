const initialState = window.__PRELOADED_STATE__.global;

const session = (state = initialState, {type, payload}) => {
  if (type === 'SET_USER_THEME') {
    return {...state, currentUser: {...state.currentUser, theme: payload}};
  }
  return state;
};

export default session;