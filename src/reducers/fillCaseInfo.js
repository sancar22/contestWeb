const initState = {
    lugarEmergencia: null,
    codigo: null,
    categoria: null,
    descAdicional: null,
    brigApoyado: null
};

const fillCaseInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case "FILL_PLACE": // Brigadistas online
            return { ...state, lugarEmergencia: action.payload };
        case "FILL_CODE":
            return { ...state, codigo: action.payload };
        case "FILL_CATEGORY":
            return { ...state, categoria: action.payload };
        case "FILL_DESCRIPTION":
            return { ...state, descAdicional: action.payload };
        case "BRIGADE_HELPED":
            return { ...state, brigApoyado: action.payload };
        default:
            return state;
    }
};

export default fillCaseInfoReducer;
