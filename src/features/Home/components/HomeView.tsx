import React from "react";
import { Button } from "react-bootstrap";
import Searchbar from "../../../components/Searchbar";
import { Location } from "../../../types/weatherTypes";
import "../styles/HomeView.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import RtkQueryError from "../../../components/RtkQueryError";

interface HomeViewProps {
  t: (key: string) => string;
  searchTerm: string;
  error: FetchBaseQueryError | SerializedError | undefined;
  setSearchTerm: (term: string) => void;
  searchResults: Location[] | undefined;
  isLoading: boolean;
  onSearch: () => void;
  onLocationClick: (location: Location) => void;
  filterData: (data: Location[]) => Location[];
}

const HomeView: React.FC<HomeViewProps> = ({
  t,
  searchTerm,
  setSearchTerm,
  searchResults,
  isLoading,
  onSearch,
  onLocationClick,
  filterData,
  error,
}) => {
  return (
    <div className="home-container">
      <h1 className="home-title">{t("Welcome to the weather app!")}</h1>
      <h2 className="home-subtitle">
        {t("Search for your location for weather details")}
      </h2>
      <Searchbar
        exportSerachTerm={(term) => setSearchTerm(term)}
        searchTerm={searchTerm}
      />
      <div className="home-search-results">
        {isLoading && <p>{t("Loading...")}</p>}
        {searchResults && searchResults?.length > 0 && (
          <ul className="home-location-list">
            {filterData(searchResults).map((location) => (
              <li
                className="home-location-item"
                key={location.Key}
                onClick={() => onLocationClick(location)}
              >
                {location.LocalizedName}
              </li>
            ))}
          </ul>
        )}
        {searchResults && searchResults.length == 0 && <div>No Results</div>}
        {error && (
          <RtkQueryError error={error} message="Error Fetching Data:" />
        )}
      </div>
      <Button className="home-search-button" onClick={onSearch}>
        {t("Search")}
      </Button>
    </div>
  );
};

export default HomeView;
