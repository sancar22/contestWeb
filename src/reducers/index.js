
import brigadaReducer from './brigada'
import fillCaseInfoReducer from './fillCaseInfo'
import {combineReducers} from 'redux'



const allReducer = combineReducers({
    brigada: brigadaReducer,
    fillCase: fillCaseInfoReducer
})


export default allReducer