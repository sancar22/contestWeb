
import brigadaReducer from './brigada'
import fillCaseInfoReducer from './fillCaseInfo'
import {combineReducers} from 'redux'



const allReducer = combineReducers({
    brigada: brigadaReducer,
    fillCase: fillCaseInfoReducer
})

// where you want to use it you have to export {useSelector} from react-redux
// and do e.g. const = counter = useSelector(state => state.counter)
// with the state before the arrow, you ahve access to all states in the store
// state.counter you take the stake of the counter in the store
// You have to import the actions in the document you want to place them
// e.g. import {increment} from '.actions(path)'
// if you want to dispatch and action import {useDispatch} from 'react-redux'
// and then place const dispatch = useDispatch()
// if you want to use it just put dispatch(actionname(payload))
// e.g dispatch(increment(5)) so every time you for instance click
// a button it will increment current state +5
// action.type, action.payload


export default allReducer