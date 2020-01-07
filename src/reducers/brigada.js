

const initState = {
    brigadeList: [],
    data : {},
    selectedBrigade: [60000],
    number: 1,
    string: ''
} 

const brigadaReducer = (state=initState, action) => {

    switch(action.type){
        case 'SELECT_GUARDS':
            return {
            ...state,
            selected: action.payload
            
            }
        case 'DECREMENT1':
            return state
        default:
            return state
    }

}


export default brigadaReducer