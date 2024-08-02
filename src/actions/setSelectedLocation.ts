export const setSelectedLocation = (location: string) => {
  return {
    type: "SET_SELECTED_LOCATION",
    payload: location,
  };
};
