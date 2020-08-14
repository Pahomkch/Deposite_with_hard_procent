import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer';


const reducers = combineReducers({app: reducer})

// const store = createStore(reducer, devToolsEnhancer() )

const store = createStore(reducers, /* preloadedState, */ devToolsEnhancer(
    // Specify custom devTools options
  ));

export default store
