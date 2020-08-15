import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer';

const reducers = combineReducers({app: reducer})

const store = createStore(reducers, /* preloadedState, */ devToolsEnhancer(
  ));

export default store
