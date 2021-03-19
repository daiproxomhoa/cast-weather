import Paper from "@material-ui/core/Paper";
import { debounce } from "lodash";
import React, { useCallback } from "react";
import { API } from "../common/API";
import { fetchData } from "../common/fetch";
import { some } from "../common/utils";
import { ReactComponent as NotFound } from "../img/notFound.svg";
import ContentCard from "./ContentCard";
import FormControlAutoComplete from "./FormControlAutoComplete";
import "./styles.scss";
import { getLabel } from "./utils";

export interface Data {
  locationData: some;
  weatherData: some;
  airPollution: some;
}
const WeatherBox = () => {
  
  const [location, setLocation] = React.useState<some>();
  const [data, setData] = React.useState<Data>();

  const search = useCallback(
    debounce(
      async (value: any) => {
        const [weatherData, airPollution] = await Promise.all([
          fetchData(API.getWeatherData(value), "get"),
          fetchData(API.getAirPollution(value), "get"),
        ]);
        setData({
          locationData: value,
          weatherData,
          airPollution,
        });
      },
      500,
      {
        trailing: true,
        leading: false,
      }
    ),
    [setData]
  );

  React.useEffect(() => {
    location && search(location);
  }, [location, search]);

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-1"
      style={{ minHeight: "100vh" }}
    >
      <Paper variant="outlined" style={{ padding: "70px 44px", width: 680 }}>
        <FormControlAutoComplete
          placeholder="input your location"
          value={location || null}
          onChange={(e: any, value: any) => {
            setLocation(value);
          }}
          fullWidth
          loadOptions={async (str: string) => {
            const locationData = await fetchData(API.getLocation(str), "get");
            return locationData;
          }}
          getOptionSelected={(option: any, value: any) => {
            return option.lat === value.lat && option.lon === value.lon;
          }}
          getOptionLabel={getLabel}
          options={[]}
          defaultText={"Hanoi"}
        />

        <Paper variant="outlined" className="card m-t-12 d-flex d-flex-column">
          {data ? (
            <ContentCard data={data} />
          ) : (
            <div className="d-flex d-flex-column justify-content-center align-items-center flex-1 p-20">
              <NotFound />
              We could not find weather information for the location above
            </div>
          )}
        </Paper>
      </Paper>
    </div>
  );
};

export default WeatherBox;
