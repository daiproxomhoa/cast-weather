import React from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import { BACKGROUND } from "common/colors";
import moment from "moment";
import { API } from "../common/API";
import { some } from "../common/utils";
import { getStatusAir, getTemperateValue } from "./utils";
import { Data } from "./WeatherBox";

interface Props {
  data: Data;
}
const ContentCard = (props: Props) => {
  const { data } = props;
  const { locationData, airPollution, weatherData } = data;

  const [selectedData, setSelectedData] = React.useState<some>(
    weatherData.current
  );
  const [temperateType, setTemperateType] = React.useState<string>("C");
  const iconUrl = selectedData?.weather[0]?.icon;

  React.useEffect(() => {
    setSelectedData(weatherData.current);
  }, [weatherData]);
  
  return (
    <>
      <div className="flex-1 p-20">
        <Typography variant="h6">
          {locationData?.name},&nbsp;{locationData.country}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(selectedData?.dt * 1000).format("dddd, LT")},&nbsp;
          {selectedData?.weather.map((v: some) => v.description).join(", ")}
        </Typography>

        <div className="m-t-20 d-flex align-items-center">
          <div className="d-flex flex-1 align-items-center">
            {iconUrl && <img src={API.getIconUrl(iconUrl)} alt="" />}
            <Typography variant="h3" component="span" color="textPrimary">
              {getTemperateValue(
                selectedData?.temp.day || selectedData?.temp,
                temperateType
              )}
              °
            </Typography>
            <Typography
              className="align-self m-l-12"
              variant="body2"
              component="span"
              style={{
                alignSelf: "flex-start",
                marginTop: 32,
                cursor: "pointer",
              }}
            >
              <span
                className={temperateType === "F" ? "active-temperate" : ""}
                onClick={() => setTemperateType("F")}
              >
                F
              </span>
              &nbsp;/&nbsp;
              <span
                className={temperateType === "C" ? "active-temperate" : ""}
                onClick={() => setTemperateType("C")}
              >
                C
              </span>
            </Typography>
          </div>
          <div className="flex-1">
            <Typography variant="body1">
              Humidity:&nbsp;{selectedData.humidity}%
            </Typography>
            <Typography variant="body1">
              Wind:&nbsp;{selectedData.wind_speed}&nbsp;km/h
            </Typography>
            <Typography variant="body1">
              Air Quality:&nbsp;
              {getStatusAir(airPollution.list?.[0].main.aqi)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="d-flex">
        {weatherData.daily.map((day, index) => {
          const url = day?.weather[0]?.icon;
          return (
            <ButtonBase
              focusRipple
              key={index}
              className="d-flex d-flex-column align-items-center flex-1 border-top border-right"
              style={{
                borderTop: "1px solid rgba(150, 150, 150, 0.3)",
                borderLeft: index
                  ? "1px solid rgba(150, 150, 150, 0.3)"
                  : undefined,
                padding: "20px 0px",
                background: day.dt === selectedData.dt ? BACKGROUND : undefined,
              }}
              onClick={() => setSelectedData(day)}
            >
              <Typography variant="subtitle1">
                {moment(day?.dt * 1000).format("ddd")}
              </Typography>
              {url && (
                <img src={API.getIconUrl(url)} alt="" style={{ width: 60 }} />
              )}
              <Typography variant="h6" component="span" color="textPrimary">
                {getTemperateValue(day?.temp.day, temperateType)}°
              </Typography>
              <Typography variant="body1" component="span" color="textPrimary">
                {getTemperateValue(day?.temp.min, temperateType)}°
              </Typography>
            </ButtonBase>
          );
        })}
      </div>
    </>
  );
};

export default ContentCard;
