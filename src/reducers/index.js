import { combineReducers }    from 'redux';
import { currentUser } from './currentUser';
import { items } from './itemsReducer'
export default combineReducers({
  currentUser,
  items
});