const initialState = {
  navDrawerOpen: false,
  settings: {
    password: {
      current: '',
      new: '',
      dialogOpen: false
    }
  }
}

const control = (state = initialState, action) => {
  if (action.type === 'TOGGLE_NAV_DRAWER') {
    return {...state, navDrawerOpen: !state.navDrawerOpen};
  }
  if (action.type === 'SET_CURRENT_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, current: action.payload}}};
  }
  if (action.type === 'SET_NEW_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, new: action.payload}}};
  }
  if (action.type === 'OPEN_PASSWORD_DIALOG') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, dialogOpen: true}}};
  }
  if (action.type === 'CLOSE_PASSWORD_DIALOG') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, dialogOpen: false}}};
  }
  if (action.type === 'RESET_PASSWORD') {
    return {...state, settings: {...state.settings, password: {...state.settings.password, current: '', new: '', dialogOpen: false}}};
  }

  return state;
}

export default control;