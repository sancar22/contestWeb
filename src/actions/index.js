
export const selectMarker = info => {
  return {
    type: "SELECT_GUARDS",
    payload: info
  };
};

export const selectOnlineGuards = info => {
  return {
    type: "SELECT_ONLINE",
    payload: info
  };
};


export const tempArray = info => {
  return {
    type: "TEMP_ARRAY",
    payload: info
  };
};


export const notifPressed = info => {
  return {
    type: "NOTIF_PRESSED",
    payload: info
  };
};


export const fillPlace = info => {
  return {
    type: "FILL_PLACE",
    payload: info
  };
};


export const fillCode = info => {
  return {
    type: "FILL_CODE",
    payload: info
  };
};


export const fillCategory = info => {
  return {
    type: "FILL_CATEGORY",
    payload: info
  };
};



export const fillDescription = info => {
  return {
    type: "FILL_DESCRIPTION",
    payload: info
  };
};