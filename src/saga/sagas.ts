import { all } from 'redux-saga/effects'
import userWatcher from './userWorker'

export function* helloSaga() {
    console.log('hello sagas!')
    yield
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        userWatcher()
    ])
}