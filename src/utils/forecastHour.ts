export const getForecastHour = (date: string): number => {
  return new Date(date.slice(0, 19)).getHours();
};
