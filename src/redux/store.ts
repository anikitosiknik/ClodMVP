import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga'

import {helloSaga} from '../saga/sagas'


const win: any = window;


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =  typeof win === 'object' && win['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? 
win['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;
      const enhancer = composeEnhancers(
        applyMiddleware( sagaMiddleware, ),
      );

export default createStore(rootReducer, enhancer);

sagaMiddleware.run(helloSaga)
