import { createMuiTheme, darken, fade } from "@material-ui/core/styles";
import { PRIMARY, SECONDARY, GREY } from "./colors";

const typography = {
  h1: {
    fontSize: "96px",
    lineHeight: "128px",
    fontWeight: 500,
  },
  h2: { fontSize: "60px", lineHeight: "80px", fontWeight: 500 },
  h3: { fontSize: "44px", lineHeight: "68px", fontWeight: 500 },
  h4: { fontSize: "34px", lineHeight: "48px", fontWeight: 500 },
  h5: { fontSize: "24px", lineHeight: "34px", fontWeight: 500 },
  h6: { fontSize: "20px", lineHeight: "32px", fontWeight: 500 },
  htmlFontSize: "14px",
  fontSize: "14px",
  subtitle0: { fontSize: "18px", lineHeight: "28px", fontWeight: 500 },
  subtitle1: { fontSize: "16px", lineHeight: "24px", fontWeight: 500 },
  subtitle2: { fontSize: "14px", lineHeight: "20px", fontWeight: 500 },
  subtitle3: { fontSize: "12px", lineHeight: "18px", fontWeight: 500 },
  body1: { fontSize: "16px", lineHeight: "24px", fontWeight: "normal" },
  body2: { fontSize: "14px", lineHeight: "20px", fontWeight: "normal" },
  body3: { fontSize: "12px", lineHeight: "18px", fontWeight: "normal" },
  caption: { fontSize: "12px", lineHeight: "18px" },
  button: {
    fontSize: "14px",
    textTransform: "none",
    lineHeight: "auto",
    fontWeight: "normal",
  },
};

export const MUI_THEME = createMuiTheme({
  breakpoints: {},
  palette: {
    primary: {
      light: fade(PRIMARY, 0.9),
      main: PRIMARY,
      dark: darken(PRIMARY, 0.1),
      contrastText: "#ffffff",
    },
    secondary: {
      light: fade(SECONDARY, 0.9),
      main: SECONDARY,
      dark: darken(SECONDARY, 0.1),
      contrastText: "#ffffff",
    },
    // text: {
    //   primary: GREY,
    //   secondary: fade(GREY, 0.6),
    // },
  },
  typography: typography as any,
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: "10px 20px",
        height: "24px",
      },
    },
  },
});
