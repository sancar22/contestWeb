import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combineReducers} from 'redux'


const allReducer = combineReducers({
    counter: counterReducer, // accessed by counter or any name
    isLogged: loggedReducer
})

export default allReducer