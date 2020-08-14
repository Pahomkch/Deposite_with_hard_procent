import { createStore, combineReducers } from 'redux'
import reducer from './reducer';

const store = createStore(combineReducers({
    app: reducer 
}))

export default store
