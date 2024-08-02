export const setSelectedLocationKey = (locationKey: string) => {
  console.log(locationKey);
  return {
    type: "SET_SELECTED_LOCATION_KEY",
    payload: locationKey,
  };
};
