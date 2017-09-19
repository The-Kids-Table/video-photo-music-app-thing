const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user
});

const setUserTheme = (theme) => ({
  type: 'SET_USER_THEME',
  payload: theme
});

export { setCurrentUser, setUserTheme };