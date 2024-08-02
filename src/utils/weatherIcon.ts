import sunCloudIcon from "../assets/suncloud.svg";
import cloudIcon from "../assets/clouds.svg";
import sunIcon from "../assets/sun-solid.svg";
import cloudRain from "../assets/cloud-rain-solid.svg";
import thunderStorm from "../assets/poo-storm-solid.svg";
import sunStorm from "../assets/sun-with-storm.svg";
import moonIcon from "../assets/moon-solid.svg";
import cloudMoon from "../assets/cloud-moon-solid.svg";
import moonStorm from "../assets/cloud-moon-solid.svg";

export const weatherIcon = (description: string, isDayMode: boolean = true) => {
  if (isDayMode) {
    switch (description.toLocaleLowerCase()) {
      case "intermittent clouds":
      case "mostly cloudy":
      case "partly sunny":
        return sunCloudIcon;
      case "cloudy":
        return cloudIcon;
      case "sunny":
      case "mostly sunny":
        return sunIcon;
      case "showers":
      case "rain":
        return cloudRain;
      case "thunderstorms":
      case "mostly cloudy w/ t-storms":
        return thunderStorm;
      case "partly sunny w/ t-storms":
        return sunStorm;
      default:
        return sunIcon;
    }
  } else {
    switch (description.toLocaleLowerCase()) {
      case "intermittent clouds":
      case "mostly cloudy":
      case "partly clear":
        return cloudMoon;
      case "cloudy":
        return cloudIcon;
      case "clear":
      case "mostly clear":
        return moonIcon;
      case "showers":
      case "rain":
        return cloudRain;
      case "thunderstorms":
      case "mostly cloudy w/ t-storms":
        return thunderStorm;
      case "partly clear w/ t-storms":
        return moonStorm;
      default:
        return moonIcon;
    }
  }
};
