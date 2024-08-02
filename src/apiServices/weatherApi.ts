import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CurrentCondition,
  FiveDayForecast,
  HourlyForecast,
  Location,
} from "../types/weatherTypes";
import { API_KEY } from "../apiKey";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dataservice.accuweather.com/",
  }),
  endpoints: (builder) => ({
    getCurrentConditions: builder.query<CurrentCondition[], string>({
      query: (locationKey: string) =>
        `currentconditions/v1/${locationKey}?apikey=${API_KEY}`,
    }),
    get5DayForecast: builder.query<FiveDayForecast, string>({
      query: (locationKey: string) =>
        `forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`,
    }),
    get24HoursForecast: builder.query<HourlyForecast[], string>({
      query: (locationKey: string) =>
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}`,
    }),
    getCityLocationKeyBySearchTerm: builder.query<Location[], string>({
      query: (searchTerm: string) =>
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`,
    }),
  }),
});

export const {
  useGetCurrentConditionsQuery,
  useGet5DayForecastQuery,
  useGetCityLocationKeyBySearchTermQuery,
  useLazyGetCityLocationKeyBySearchTermQuery,
  useGet24HoursForecastQuery,
} = weatherApi;
