import { all } from 'redux-saga/effects'
import clothWorker from './clothWorker';
import authWatcher from './userAuthWorker'
import userInfoWatcher from './userInfoWorker';

export function* helloSaga() {
    console.log('hello sagas!')
    yield
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        authWatcher(),
        userInfoWatcher(),
        clothWorker(),

    ])
}