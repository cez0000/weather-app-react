import React from "react";
import { ForecastDay, HourlyForecast } from "../../../types/weatherTypes";
import { fahrenheitToCelscius } from "../../../utils/fahrenheitToCelscius";
import { weatherIcon } from "../../../utils/weatherIcon";
import { getForecastHour } from "../../../utils/forecastHour";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
            <div style={{ margin: "10px 0" }}>
              <img
                style={{ height: "100px" }}
                src={weatherIcon(forecastDay.Day.IconPhrase, isDayMode)}
              />
            </div>
            <div>
              {isDayMode
                ? t(forecastDay.Day.IconPhrase.toLocaleLowerCase())
                : t(forecastDay.Night.IconPhrase.toLocaleLowerCase())}
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
              {t("Percipitation")}:{" "}
              {forecastUnitToCheck(forecastDay).HasPrecipitation
                ? t("Yes")
                : t("No")}
            </div>
            {forecastUnitToCheck(forecastDay).PrecipitationType && (
              <div>
                {t("Percipitation Type")}:{" "}
                {t(
                  forecastUnitToCheck(forecastDay).PrecipitationType as string
                )}
              </div>
            )}
            {forecastUnitToCheck(forecastDay).PrecipitationIntensity && (
              <div>
                {t("Percipitation Intensity")}:{" "}
                {t(
                  forecastUnitToCheck(forecastDay)
                    .PrecipitationIntensity as string
                )}
              </div>
            )}
          </>
        )}
        {forecastHour && (
          <>
            <div>{forecastHour.DateTime.slice(5, 16).replace("T", " ")}</div>
            <div style={{ margin: "10px 0" }}>
              <img
                style={{ height: "100px" }}
                src={weatherIcon(
                  forecastHour.IconPhrase,
                  getForecastHour(forecastHour.DateTime) < 21 &&
                    getForecastHour(forecastHour.DateTime) > 4
                )}
              />
            </div>
            <div>{t(forecastHour.IconPhrase.toLocaleLowerCase())}</div>
            <div>
              {fahrenheitToCelscius(forecastHour.Temperature.Value).toFixed(0)}{" "}
              °C
            </div>
            <div>
              {t("Percipitation probability")}:{" "}
              {forecastHour.PrecipitationProbability} %
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForecastDetailsModal;
