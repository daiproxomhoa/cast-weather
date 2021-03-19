export const getTemperateValue = (temp: number, option?: string) => {
  if (option === "F") {
    return Number(((temp - 273.15) * 9) / 5 + 32);
  }
  return Number(temp - 273.15);
};
