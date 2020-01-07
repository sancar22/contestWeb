const initState = {
  brigadeListOnline: [],
  selectedBrigade: []
};

const brigadaReducer = (state = initState, action) => {
  switch (action.type) {
    case "SELECT_GUARDS": // Marcadores
      return {
        ...state
      };
    case "SELECT_ONLINE": // Brigadistas online
      return {
        ...state,
        brigadeListOnline: action.payload
      };
    default:
      return state;
  }
};

export default brigadaReducer;
