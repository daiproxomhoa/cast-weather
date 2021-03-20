import Paper from "@material-ui/core/Paper";
import React from "react";
import { some } from "../configs/utils";
import ContentBox from "./ContentBox";
import { fakeData } from "./fakeData";
import "./styles.scss";

const MainBox = () => {
  const [data, setData] = React.useState<some>(fakeData);

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-1"
      style={{ minHeight: "100vh" }}
    >
      <Paper variant="outlined" style={{ padding: "70px 44px", width: 680 }}>
        <ContentBox data={data} />
      </Paper>
    </div>
  );
};

export default MainBox;
