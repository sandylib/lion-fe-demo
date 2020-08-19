import { select, put, call, takeEvery} from 'redux-saga/effects';
import * as CONSTANTS from '../constants/actionConstants';
import request from '../utils/request';
import { currentUserSaga } from './currentUserSaga';

function* handleIncreaseItemQuantity({payload}) {
  try {
    const {id} = payload;
    yield put({type: CONSTANTS.INPROGRESS_ADD_ITEM, payload: {id, inprogress:true,}});
    const user = yield select(state => state.currentUser);
    const response = yield call(fetch,`/cart/add/${user.id}/${id}`);
    yield put({type: CONSTANTS.INPROGRESS_ADD_ITEM, payload: {id, inprogress: false,}});
    if(response.status !== 200) {
      alert("Sorry, there weren't enough items in stock to complete your request.");
    } else {
       //! items increase
      yield put({type: CONSTANTS.UPDATE_ALL_ITEMS_DECREASE_QUANTITY, payload: id});
    }
  } catch (error) {
    //todo: 
  }
}


export function* addItemSaga() {
  yield takeEvery(CONSTANTS.UPDATE_ALL_ITEMS, handleIncreaseItemQuantity)
}

function* handleDecreaseItemQuantity({payload}) {
  try {
    
    yield put({type: CONSTANTS.INPROGRESS, payload: true});
    const user = yield select(state => state.currentUser);
    const response = yield call(fetch,`/cart/remove/${user.id}/${payload}`);
    yield put({type: CONSTANTS.INPROGRESS, payload: false});
    if(response.status !== 200) {
      console.warn("Received non-200 status:: ", response);
    } else {
       //! items decrease
       yield put({type: CONSTANTS.UPDATE_ALL_ITEMS_DECREASE_QUANTITY, payload: payload});
    }

  } catch (error) {
    //todo: 
  }
}


export function* removeItemSaga() {
  yield takeEvery(CONSTANTS.UPDATE_ALL_ITEMS_REMOVE, handleDecreaseItemQuantity)
}