// src/types/weatherTypes.ts
export interface Temperature {
  Metric: {
    Value: number;
    Unit: string;
  };
  Imperial: {
    Value: number;
    Unit: string;
  };
}

export interface CurrentCondition {
  LocalObservationDateTime: string;
  WeatherText: string;
  Temperature: Temperature;
}

export interface ForecastDay {
  Date: string;
  Day: {
    IconPhrase: string;
    Icon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Night: {
    IconPhrase: string;
    Icon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
    };
    Maximum: {
      Value: number;
      Unit: string;
    };
  };
}

export interface FiveDayForecast {
  DailyForecasts: ForecastDay[];
}

export interface Location {
  Key: string;
  LocalizedName: string;
}

export interface HourlyForecast {
  DateTime: string;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  PrecipitationProbability: number;
}
