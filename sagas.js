import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getRoot } from './api';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log('Hello Sagas!')
}


// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* getRootSaga() {
  const root = yield call(getRoot);
  alert(JSON.stringify(root))
  yield put({
    type: 'ROOT',
    payload: root.data
  });
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchGetRoot() {
  yield takeEvery('GET_ROOT', getRootSaga)
}


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchGetRoot()
  ])
}
