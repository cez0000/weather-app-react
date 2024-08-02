import React from "react";
import { ForecastDay, HourlyForecast } from "../../../types/weatherTypes";
import { fahrenheitToCelscius } from "../../../utils/fahrenheitToCelscius";
import { weatherIcon } from "../../../utils/weatherIcon";
import { getForecastHour } from "../../../utils/forecastHour";

interface ForecastDetailsProps {
  forecastDay?: ForecastDay;
  forecastHour?: HourlyForecast;
  onClose: () => void;
  isDayMode?: boolean;
}
const ForecastDetailsModal: React.FC<ForecastDetailsProps> = ({
  forecastDay,
  forecastHour,
  onClose,
  isDayMode,
}) => {
  const forecastUnitToCheck = (forecastDayBase: ForecastDay) => {
    return isDayMode ? forecastDayBase.Day : forecastDayBase.Night;
  };
  return (
    <div className="over-lay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {forecastDay && (
          <>
            <div>{forecastDay.Date.slice(0, 10)}</div>
            <div>
              <img
                style={{ width: "20%" }}
                src={weatherIcon(forecastDay.Day.IconPhrase, isDayMode)}
              />
            </div>
            <div>
              {isDayMode
                ? forecastDay.Day.IconPhrase
                : forecastDay.Night.IconPhrase}
            </div>
            <div>
              {fahrenheitToCelscius(
                isDayMode
                  ? forecastDay.Temperature.Maximum.Value
                  : forecastDay.Temperature.Minimum.Value
              ).toFixed(0)}{" "}
              °C
            </div>

            <div>
              Percipitation:{" "}
              {forecastUnitToCheck(forecastDay).HasPrecipitation ? "Yes" : "No"}
            </div>
            {forecastUnitToCheck(forecastDay).PrecipitationType && (
              <div>
                Percipitation Type:{" "}
                {forecastUnitToCheck(forecastDay).PrecipitationType}
              </div>
            )}
            {forecastUnitToCheck(forecastDay).PrecipitationIntensity && (
              <div>
                Percipitation Type:{" "}
                {forecastUnitToCheck(forecastDay).PrecipitationIntensity}
              </div>
            )}
          </>
        )}
        {forecastHour && (
          <>
            <div>{forecastHour.DateTime.slice(5, 16).replace("T", " ")}</div>
            <div>
              <img
                style={{ width: "20%" }}
                src={weatherIcon(
                  forecastHour.IconPhrase,
                  getForecastHour(forecastHour.DateTime) < 21 &&
                    getForecastHour(forecastHour.DateTime) > 4
                )}
              />
            </div>
            <div>{forecastHour.IconPhrase}</div>
            <div>
              {fahrenheitToCelscius(forecastHour.Temperature.Value).toFixed(0)}{" "}
              °C
            </div>
            <div>
              Percipitation probability: {forecastHour.PrecipitationProbability}{" "}
              %
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForecastDetailsModal;
