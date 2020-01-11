import _ from 'lodash'

const initState = {
  brigadeListOnline: [],
  selectedBrigade : []
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
            Email: brigade.Email
          }
        })
      }
    default:
      return state;
  }
};

export default brigadaReducer;
