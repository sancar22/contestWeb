import brigadaReducer from "./brigada";
import fillCaseInfoReducer from "./fillCaseInfo";
import caseReducer from "./cases";
import { combineReducers } from "redux";

const allReducer = combineReducers({
    brigada: brigadaReducer,
    fillCase: fillCaseInfoReducer,
    casos: caseReducer
});

export default allReducer;
