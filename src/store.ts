import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./apiServices/weatherApi";
import selectedLocationReducer from "./reducers/selectedLoacationReducer";

const store = configureStore({
  reducer: {
    location: selectedLocationReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
