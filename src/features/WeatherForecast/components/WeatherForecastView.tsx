import React from "react";
import ReactSwitch from "react-switch";
import ForecastDetailsWidget from "./ForecastDetailsWIdget";
import ForecastDetailsModal from "./ForecastDetailsModal";
import { PeriodEnum } from "../../../enums/periodEnum";
import { weatherIcon } from "../../../utils/weatherIcon";
import {
  CurrentCondition,
  FiveDayForecast,
  HourlyForecast,
} from "../../../types/weatherTypes";
import "../styles/WeatherForecastView.css";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import RtkQueryError from "../../../components/RtkQueryError";

interface WeatherForecastViewProps {
  t: (key: string) => string;
  selectedLocation: string;
  selectedPeriod: PeriodEnum;
  isDayMode: boolean;
  modalIndex: number | null;
  currentConditionError: FetchBaseQueryError | SerializedError | undefined;
  fiveDayError: FetchBaseQueryError | SerializedError | undefined;
  hoursError: FetchBaseQueryError | SerializedError | undefined;
  currentConditions: CurrentCondition[] | undefined;
  fiveDayForecast: FiveDayForecast | undefined;
  twentyFourHoursForecast: HourlyForecast[] | undefined;
  onChangePeriod: (period: PeriodEnum) => void;
  onToggleDayMode: () => void;
  onOpenDetails: (index: number) => void;
  onCloseDetails: () => void;
}

const WeatherForecastView: React.FC<WeatherForecastViewProps> = ({
  t,
  selectedLocation,
  selectedPeriod,
  isDayMode,
  modalIndex,
  currentConditions,
  fiveDayForecast,
  twentyFourHoursForecast,
  currentConditionError,
  fiveDayError,
  hoursError,
  onChangePeriod,
  onToggleDayMode,
  onOpenDetails,
  onCloseDetails,
}) => (
  <div className="weather-forecast-container">
    {currentConditions && !currentConditionError && (
      <div className="weather-header">
        <h1 className="weather-forecast-location">{selectedLocation}</h1>
        <h2 className="weather-forecast-temperature">
          {t("Temperature now")}:{" "}
          {currentConditions[0].Temperature.Metric.Value}°C
        </h2>
        <img
          className="weather-forecast-icon"
          src={weatherIcon(currentConditions[0].WeatherText)}
          alt="Weather Icon"
        />
        <div className="weather-forecast-condition">
          {t(currentConditions[0].WeatherText.toLocaleLowerCase())}
        </div>
        <div className="weather-forecast-period">
          <label htmlFor="time-period">{t("Select Time Period")}:</label>
          <select
            id="time-period"
            value={selectedPeriod}
            onChange={(e) => onChangePeriod(+e.target.value as PeriodEnum)}
          >
            <option value={PeriodEnum.hourly}>12 {t("hours")}</option>
            <option value={PeriodEnum.daily}>5 {t("days")}</option>
          </select>
        </div>
      </div>
    )}
    {currentConditionError && (
      <RtkQueryError
        error={currentConditionError}
        message="Error fetching current conditions:"
      />
    )}

    {selectedPeriod === PeriodEnum.hourly && (
      <div className="weather-forecast-details">
        {!hoursError && (
          <>
            {twentyFourHoursForecast?.map((f, index) => (
              <ForecastDetailsWidget
                key={index}
                forecastHour={f}
                openDetails={() => onOpenDetails(index)}
              />
            ))}
            {modalIndex !== null && (
              <ForecastDetailsModal
                forecastHour={twentyFourHoursForecast?.[modalIndex]}
                onClose={onCloseDetails}
              />
            )}
          </>
        )}
        {hoursError && (
          <RtkQueryError
            error={hoursError}
            message="Error Fetching Hourly Forecast:"
          />
        )}
      </div>
    )}

    {selectedPeriod === PeriodEnum.daily && (
      <>
        {!fiveDayError && (
          <>
            <div className="weather-forecast-day-mode-toggle">
              <span>{t("Show Night Forecast")}</span>
              <ReactSwitch checked={!isDayMode} onChange={onToggleDayMode} />
            </div>
            <div className="weather-forecast-details">
              {fiveDayForecast?.DailyForecasts.map((f, index) => (
                <ForecastDetailsWidget
                  key={index}
                  forecastDay={f}
                  openDetails={() => onOpenDetails(index)}
                  isDayMode={isDayMode}
                />
              ))}
              {modalIndex !== null && (
                <ForecastDetailsModal
                  forecastDay={fiveDayForecast?.DailyForecasts?.[modalIndex]}
                  onClose={onCloseDetails}
                  isDayMode={isDayMode}
                />
              )}
            </div>
          </>
        )}
        {fiveDayError && (
          <RtkQueryError
            error={fiveDayError}
            message="Error Fetching Daily Forecast:"
          />
        )}
      </>
    )}
  </div>
);

export default WeatherForecastView;
