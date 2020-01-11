import _ from 'lodash'

const initState = {
  brigadeListOnline: [],
  selectedBrigade : [],
  tempArray: [],
  buttonClick: null
};

const brigadaReducer = (state = initState, action) => {
  switch (action.type) {
    case "SELECT_ONLINE": // Brigadistas online
      return {
        ...state,
        brigadeListOnline: action.payload
      };
      case "SELECT_GUARDS": // Marcadores
      return {...state,
        selectedBrigade: action.payload.filter(brigadista =>{
         return  brigadista.selected
        }).map(brigade => {
          return{
            Expotoken: brigade.Expotoken,
            Email: brigade.Email,
            UID: brigade.UID,
            receivedNotif: brigade.receivedNotif
          }
        })
      };
      case "TEMP_ARRAY":
        return{...state, tempArray: action.payload};
      case "NOTIF_PRESSED":
        return {...state, buttonClick: action.payload}
    default:
      return state;
  }
};

export default brigadaReducer;
