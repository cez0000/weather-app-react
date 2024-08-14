import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../../actions/setSelectedLocation";
import { useLazyGetCityLocationKeyBySearchTermQuery } from "../../apiServices/weatherApi";
import { Location } from "../../types/weatherTypes";
import { useNavigate } from "react-router-dom";
import { setSelectedLocationKey } from "../../actions/setSelectedLocationKey";
import { useTranslation } from "react-i18next";
import HomeView from "./components/HomeView";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger, { data: searchResults, isLoading, error: searchError }] =
    useLazyGetCityLocationKeyBySearchTermQuery();

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      trigger(searchTerm);
    }
  }, [searchTerm, trigger]);

  const filterData = useCallback((data: Location[]): Location[] => {
    return data.filter(
      (l, index) =>
        !data.slice(0, index).find((e) => e.LocalizedName === l.LocalizedName)
    );
  }, []);

  const handleLocationClick = useCallback(
    (location: Location): void => {
      dispatch(setSelectedLocation(location.LocalizedName));
      dispatch(setSelectedLocationKey(location.Key));
      navigate("/forecast");
    },
    [dispatch, navigate]
  );

  return (
    <HomeView
      t={t}
      error={searchError}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchResults={searchResults}
      isLoading={isLoading}
      onSearch={handleSearch}
      onLocationClick={handleLocationClick}
      filterData={filterData}
    />
  );
};

export default Home;
