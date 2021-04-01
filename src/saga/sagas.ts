import { all } from 'redux-saga/effects'
import adminWorker from './adminWorker';
import clothWorker from './clothWorker';
import lookWorker from './lookWorker';
import authWatcher from './authWorker'
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
        lookWorker(),
        adminWorker()
    ])
}