export const setSelectedLocationKey = (locationKey: string) => {
  return {
    type: "SET_SELECTED_LOCATION_KEY",
    payload: locationKey,
  };
};
