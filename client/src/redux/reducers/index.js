import { combineReducers } from 'redux';
import control from './control';
import data from './data';

const reducer = combineReducers({
  control,
  data
});

export default reducer;