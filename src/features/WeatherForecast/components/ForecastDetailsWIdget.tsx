import React, { useEffect } from "react";
import { ForecastDay, HourlyForecast } from "../../../types/weatherTypes";
import { fahrenheitToCelscius } from "../../../utils/fahrenheitToCelscius";
import { weatherIcon } from "../../../utils/weatherIcon";
import { getForecastHour } from "../../../utils/forecastHour";
import { useTranslation } from "react-i18next";
interface ForecastDetailsWidgetProps {
  forecastDay?: ForecastDay;
  forecastHour?: HourlyForecast;
  openDetails: () => void;
  isDayMode?: boolean;
}
const ForecastDetailsWidget: React.FC<ForecastDetailsWidgetProps> = ({
  forecastDay,
  forecastHour,
  openDetails,
  isDayMode,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (forecastHour)
      console.log(new Date(forecastHour.DateTime.slice(0, 19)).getHours());
  }, []);

  return (
    <div
      style={{
        width: "20%",
        minWidth: "100px",
      }}
    >
      <div
        onClick={openDetails}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "92%",
          height: "150px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "1px 1px 10px 0px rgba(66, 68, 90, 1)",
          cursor: "pointer",
        }}
      >
        {forecastDay && (
          <>
            <div>{forecastDay.Date.slice(0, 10)}</div>
            <div style={{ height: "33%" }}>
              <img
                style={{ height: "90%" }}
                src={weatherIcon(
                  isDayMode
                    ? forecastDay.Day.IconPhrase
                    : forecastDay.Night.IconPhrase,
                  isDayMode
                )}
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
          </>
        )}
        {forecastHour && (
          <>
            <div>{forecastHour.DateTime.slice(5, 16).replace("T", " ")}</div>
            <div style={{ height: "33%" }}>
              <img
                style={{ height: "90%" }}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ForecastDetailsWidget;
