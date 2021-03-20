import { MuiThemeProvider } from "@material-ui/core";
import { MUI_THEME } from "configs/setupTheme";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <MuiThemeProvider theme={MUI_THEME}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
