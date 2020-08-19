import {takeLatest, put, call} from 'redux-saga/effects';
import * as CONSTANTS from '../constants/actionConstants';
import request from '../utils/request';

function* doGetAllItems({}) {
  try {
    const items = yield call(request,`/items`);
    yield put({type: CONSTANTS.SET_ALL_ITEMS, payload: items})
    
  } catch (error) {
    //todo: 
  }
}


export function* itemsSaga() {
  yield takeLatest(CONSTANTS.GET_ALL_ITEMS, doGetAllItems)
}