import {takeEvery, put, call} from 'redux-saga/effects';
import * as CONSTANTS from '../constants/actionConstants';
import request from '../utils/request';

export function* doGetCurrentUser({payload}) {
  const {id} = payload;
  try {
    yield put({type: CONSTANTS.INPROGRESS, payload: true});
    const user = yield call(request,`/user/${id}`);
    const cart = yield call(request, `/cart/${id}`);
    yield put({type: CONSTANTS.SET_CURRENT_USER, payload: user});
    yield put({type: CONSTANTS.SET_CURRENT_USER_CART, payload: cart.items});
    yield put({type: CONSTANTS.INPROGRESS, payload: false});
  } catch (error) {
    //todo: handle fail and display error message
  }

}


export function* currentUserSaga() {
  yield takeEvery(CONSTANTS.GET_CURRENT_USER, doGetCurrentUser)
}