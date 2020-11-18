import { put, takeEvery, all } from 'redux-saga/effects'
import axios from "axios";

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

// Our worker Saga: will perform the async increment task
export function* getRoot() {
  axios.get(`http://127.0.0.1:8000/root`)
  .then(res => {
    const root = res.data;
  })
  console.log(root)
  yield put({ type: "ROOT", root})
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchGetRoot() {
  yield takeEvery('GET_ROOT', getRoot)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchGetRoot()
  ])
}
