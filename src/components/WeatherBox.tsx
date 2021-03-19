import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { useCallback } from "react";
import { API } from "../common/API";
import { fetchData } from "../common/fetch";
import { debounce } from "lodash";
import React from "react";
import { some } from "../common/utils";
import "./styles.scss";
import { Typography } from "@material-ui/core";
import { ReactComponent as NotFound } from "../img/notFound.svg";
import ContentCard from "./ContentCard";

export interface Data {
  locationData: some;
  weatherData: some;
  airPollution: some;
}
function WeatherBox() {
  const [data, setData] = React.useState<Data>();

  const [message, setMessage] = React.useState<string>();

  const search = debounce(
    async (text: string) => {
      console.log(text);
      const locationData = await fetchData(API.getLocation(text), "get");
      if (locationData.length) {
        const location = locationData[0];
        const [weatherData, airPollution] = await Promise.all([
          fetchData(API.getWeatherData(location), "get"),
          fetchData(API.getAirPollution(location), "get"),
        ]);
        setData({
          locationData: location,
          weatherData,
          airPollution,
        });
      } else {
        setMessage("Location not found");
      }
    },
    500,
    {
      trailing: true,
      leading: false,
    }
  );

  console.log(data);

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-1"
      style={{ minHeight: "100vh" }}
    >
      <Paper variant="outlined" style={{ padding: "70px 44px", width: 680 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="input your location"
          onChange={(e) => search(e.target.value)}
          defaultValue="Hanoi"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton style={{ padding: 4 }}>
                  <CloseIcon style={{ fontSize: 28 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div className="card m-t-12">
          <div className={"d-flex p-20"}>
            {data ? (
              <ContentCard data={data} />
            ) : (
              <div className="d-flex d-flex-column justify-content-center align-items-center flex-1">
                <NotFound />
                We could not find weather information for the location above
              </div>
            )}
          </div>
          <div></div>
        </div>
      </Paper>
    </div>
  );
}

export default WeatherBox;
