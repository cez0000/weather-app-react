import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrentConditionsQuery,
  useGet5DayForecastQuery,
  useGet24HoursForecastQuery,
} from "../../apiServices/weatherApi";
import ReactSwitch from "react-switch";
import ForecastDetailsWidget from "./components/ForecastDetailsWIdget";
import { PeriodEnum } from "../../enums/periodEnum";
import { weatherIcon } from "../../utils/weatherIcon";
import ForecastDetailsModal from "./components/ForecastDetailsModal";
import { useTranslation } from "react-i18next";

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
  const { data: currentConditions } =
    useGetCurrentConditionsQuery(selectedLocationKey);
  const { data: fiveDayforecast } =
    useGet5DayForecastQuery(selectedLocationKey);

  const { data: twentyFourHoursForecast } =
    useGet24HoursForecastQuery(selectedLocationKey);

  useEffect(() => {
    if (!selectedLocation) navigate("/");
  }, []);

  const handleChange = (event: any) => {
    setSelectedPeriod(+event.target.value);
  };

  const handleOpenDetails = (index: number) => {
    setModalIndex(index);
  };

  return (
    <div>
      {currentConditions && (
        <div
          style={{
            minHeight: "30vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>{selectedLocation && selectedLocation}</h1>
          <h2>
            {t("Temperature now")}:{" "}
            {currentConditions[0].Temperature.Metric.Value}°C
          </h2>
          <div>
            <img
              style={{ width: "5%" }}
              src={weatherIcon(currentConditions[0].WeatherText)}
            />
          </div>
          <div style={{ fontWeight: "bold" }}>
            {t(currentConditions[0].WeatherText.toLocaleLowerCase())}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }} htmlFor="time-period">
              {t("Select Time Period")}:{" "}
            </label>
            <select
              style={{
                width: "100px",
                height: "40px",
                marginLeft: "10px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
              id="time-period"
              value={selectedPeriod}
              onChange={handleChange}
            >
              <option value={PeriodEnum.hourly}>12 {t("hours")}</option>
              <option value={PeriodEnum.daily}>5 {t("days")}</option>
            </select>
          </div>
        </div>
      )}

      {selectedPeriod === PeriodEnum.hourly && (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            width: "90%",
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          {twentyFourHoursForecast?.map((f, index) => {
            return (
              <ForecastDetailsWidget
                key={index}
                forecastHour={f}
                openDetails={() => handleOpenDetails(index)}
              />
            );
          })}
          {modalIndex !== null && twentyFourHoursForecast && (
            <ForecastDetailsModal
              forecastHour={twentyFourHoursForecast[modalIndex]}
              onClose={() => setModalIndex(null)}
            />
          )}
        </div>
      )}
      {selectedPeriod === PeriodEnum.daily && (
        <>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            <div style={{ marginBottom: "5px" }}>
              {t("Show Night Forecast")}
            </div>
            <ReactSwitch
              checked={!isDayMode}
              onChange={() => setIsDayMode(!isDayMode)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "90%",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            {fiveDayforecast?.DailyForecasts.map((f, index) => {
              return (
                <ForecastDetailsWidget
                  key={index}
                  forecastDay={f}
                  openDetails={() => handleOpenDetails(index)}
                  isDayMode={isDayMode}
                />
              );
            })}
            {modalIndex !== null && fiveDayforecast && (
              <ForecastDetailsModal
                forecastDay={fiveDayforecast.DailyForecasts[modalIndex]}
                onClose={() => setModalIndex(null)}
                isDayMode={isDayMode}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
