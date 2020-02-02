const initState = {
    casos: []
};

const caseReducer = (state = initState, action) => {
    switch (action.type) {
        case "FILL_CASES": // Brigadistas online
            return (state = action.payload);

        default:
            return state;
    }
};

export default caseReducer;
