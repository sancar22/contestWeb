const initState = {
    brigadeListOnline: [],
    selectedBrigade: [],
    tempArray: [],
    buttonClick: null,
    allBrigades: [],
    activeCases: [],
};

const brigadaReducer = (state = initState, action) => {
    switch (action.type) {
        case "SELECT_ONLINE": // Brigadistas online
            return {
                ...state,
                brigadeListOnline: action.payload,
            };
        case "SELECT_GUARDS": // Marcadores
            return {
                ...state,
                selectedBrigade: action.payload
                    .filter(brigadista => {
                        return brigadista.selected;
                    })
                    .map(brigade => {
                        return {
                            Expotoken: brigade.Expotoken,
                            Email: brigade.Email,
                            UID: brigade.UID,
                            receivedNotif: brigade.receivedNotif,
                            nombre: brigade.nombre,
                            apellido: brigade.apellido,
                        };
                    }),
            };

        case "SELECT_ALL":
            return { ...state, allBrigades: action.payload };
        case "SELECT_ACTIVE_CASES":
            return { ...state, activeCases: action.payload };
        case "TEMP_ARRAY":
            return { ...state, tempArray: action.payload };
        case "NOTIF_PRESSED":
            return { ...state, buttonClick: action.payload };
        default:
            return state;
    }
};

export default brigadaReducer;
