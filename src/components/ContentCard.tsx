import { Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { API } from "../common/API";
import { some } from "../common/utils";
import { getTemperateValue } from "./utils";
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
  const [temperateType, setTemperateType] = React.useState<string>();
  const iconUrl = selectedData?.weather[0]?.icon;
  return (
    <div>
      <Typography variant="h6">
        {locationData?.name},&nbsp;{locationData.country}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {moment(selectedData?.dt * 1000).format("dddd, LT")},&nbsp;
        {selectedData?.weather.map((v: some) => v.description).join(", ")}
        <div className="m-t-20 d-flex align-items-center">
          <div className="d-flex flex-1 align-items-center">
            {iconUrl && (
              <img
                src={API.getIconUrl(selectedData?.weather[0]?.icon)}
                alt=""
              />
            )}
            <Typography variant="h3" component="span" color="textPrimary">
              {getTemperateValue(selectedData?.temp, temperateType)}°
            </Typography>
            <Typography
              className="align-self m-l-12"
              variant="body2"
              component="span"
              style={{ alignSelf: "flex-start", marginTop: 32 }}
            >
              <span className="">F</span>/<span>C</span>
            </Typography>
          </div>
          <div></div>
        </div>
      </Typography>
    </div>
  );
};

export default ContentCard;
