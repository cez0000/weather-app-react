const initialState = {
  selectedLocation: "",
  selectedLoacationKey: "",
};

const selectedLoacationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case "SET_SELECTED_LOCATION_KEY": {
      return {
        ...state,
        selectedLocationKey: action.payload,
      };
    }
    default:
      return state;
  }
};

export default selectedLoacationReducer;
