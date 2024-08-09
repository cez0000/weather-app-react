import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Searchbar from "../../components/Searchbar";
import { useDispatch } from "react-redux";
import { setSelectedLocation } from "../../actions/setSelectedLocation";
import { useLazyGetCityLocationKeyBySearchTermQuery } from "../../apiServices/weatherApi";
import { Location } from "../../types/weatherTypes";
import { useNavigate } from "react-router-dom";
import { setSelectedLocationKey } from "../../actions/setSelectedLocationKey";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger, { data: searchResults, isLoading }] =
    useLazyGetCityLocationKeyBySearchTermQuery();
  const handleSearch = () => {
    if (searchTerm.trim()) {
      trigger(searchTerm);
    }
  };

  const filterData = (data: Location[]): Location[] => {
    return data.filter(
      (l, index) =>
        !data.slice(0, index).find((e) => e.LocalizedName == l.LocalizedName)
    );
  };

  const handleLocationClick = (location: Location): void => {
    console.log(location);
    dispatch(setSelectedLocation(location.LocalizedName));
    dispatch(setSelectedLocationKey(location.Key));
    navigate("/forecast");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h1 style={{ marginTop: "100px" }}>{t("Welcome to the weather app!")}</h1>
      <h2>{t("Search for your location for weather details")}</h2>
      <Searchbar
        exportSerachTerm={(searchTerm) => setSearchTerm(searchTerm)}
        searchTerm={searchTerm}
      />
      <div style={{ marginTop: "10px" }}>
        {isLoading && <p>{t("Loading...")}</p>}
        {/* {error && <p>Error: {error}</p>} */}
        {searchResults && (
          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              width: "300px",
              paddingLeft: "0",
            }}
          >
            {filterData(searchResults).map((location) => (
              <li
                className="searchListElement selected"
                key={location.Key}
                onClick={() => handleLocationClick(location)}
              >
                {location.LocalizedName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Button onClick={handleSearch}>{t("Search")}</Button>
      </div>
    </div>
  );
};

export default Home;
