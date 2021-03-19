import { some } from "../common/utils";

export const getTemperateValue = (temp: number, option?: string): number => {
  let tmp;
  if (option === "F") {
    tmp = (temp - 273.15) * (9 / 5) + 32;
  } else {
    tmp = temp - 273.15;
  }
  console.log("tmp", temp, option, tmp);

  return Math.floor(tmp);
};

export const getLabel = (option: some): string => {
  return option.name;
};

export const getStatusAir = (status: number): string => {
  let text = "";
  switch (status) {
    case 1:
      text = "Good";
      break;
    case 2:
      text = "Fair";
      break;
    case 3:
      text = "Moderate";
      break;
    case 4:
      text = "Poor";
      break;
    case 5:
      text = "Poor";
      break;
    default:
      break;
  }
  return text;
};
