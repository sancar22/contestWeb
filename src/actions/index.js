
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
