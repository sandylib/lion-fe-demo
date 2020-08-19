import { all, fork} from 'redux-saga/effects';
import { currentUserSaga } from './currentUserSaga';
import { itemsSaga } from './itemsSaga';
import { addItemSaga, removeItemSaga } from './itemQuantitySaga';

export default function* rootSaga() {
  yield all([
    fork(currentUserSaga),
    fork(itemsSaga),
    fork(addItemSaga),
    fork(removeItemSaga)
  ])
}