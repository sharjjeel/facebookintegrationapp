import { combineReducers } from 'redux';
import post from './post';
import list from './list';
import facebookauth from './facebookauth';
const reducers = combineReducers({
  post,
  list,
  facebookauth
})

export default reducers