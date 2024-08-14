import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrentConditionsQuery,
  useGet5DayForecastQuery,
  useGet24HoursForecastQuery,
} from "../../apiServices/weatherApi";
import { PeriodEnum } from "../../enums/periodEnum";
import { useTranslation } from "react-i18next";
import WeatherForecastView from "./components/WeatherForecastView";

const WeatherForecast: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodEnum>(
    PeriodEnum.hourly
  );
  const [isDayMode, setIsDayMode] = useState<boolean>(true);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const selectedLocation = useSelector(
    (state: any) => state.location.selectedLocation
  );
  const selectedLocationKey = useSelector(
    (state: any) => state.location.selectedLocationKey
  );
  const { data: currentConditions, error: currentConditionsError } =
    useGetCurrentConditionsQuery(selectedLocationKey);
  const { data: fiveDayForecast, error: fiveDayForecastError } =
    useGet5DayForecastQuery(selectedLocationKey);
  const { data: twentyFourHoursForecast, error: twentyFourHoursForecastError } =
    useGet24HoursForecastQuery(selectedLocationKey);

  useEffect(() => {
    if (!selectedLocation) navigate("/");
  }, [selectedLocation, navigate]);

  const handleChangePeriod = useCallback((period: PeriodEnum) => {
    setSelectedPeriod(period);
  }, []);

  const handleToggleDayMode = useCallback(() => {
    setIsDayMode((prev) => !prev);
  }, []);

  const handleOpenDetails = useCallback((index: number) => {
    setModalIndex(index);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setModalIndex(null);
  }, []);

  return (
    <WeatherForecastView
      t={t}
      selectedLocation={selectedLocation}
      selectedPeriod={selectedPeriod}
      hoursError={twentyFourHoursForecastError}
      fiveDayError={fiveDayForecastError}
      currentConditionError={currentConditionsError}
      isDayMode={isDayMode}
      modalIndex={modalIndex}
      currentConditions={currentConditions}
      fiveDayForecast={fiveDayForecast}
      twentyFourHoursForecast={twentyFourHoursForecast}
      onChangePeriod={handleChangePeriod}
      onToggleDayMode={handleToggleDayMode}
      onOpenDetails={handleOpenDetails}
      onCloseDetails={handleCloseDetails}
    />
  );
};

export default WeatherForecast;
