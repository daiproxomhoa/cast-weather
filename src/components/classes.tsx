import { makeStyles } from "@material-ui/core";
import { deepOrange, deepPurple, yellow } from "@material-ui/core/colors";
import { createStyles, Theme } from "@material-ui/core/styles";
import { GREY, GREY_500 } from "configs/colors";

export const useStylesAvatar = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    marginRight: 12,
  },
  avatar_3: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  avatar_1: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatar_2: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: yellow[500],
  },
}));
export const useStylesForm = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      minWidth: "200px",
      maxWidth: "200px",
      "&:focus": {
        borderRadius: "4px",
      },
      "& option": {
        color: theme.palette.text.primary,
      },
    },
    bootstrap: {
      margin: 0,
      borderRadius: 20,
      backgroundColor: GREY_500,
      "& .MuiInputBase-input": {
        fontSize: "14px",
        padding: "8px 12px",
        color: theme.palette.common.white,
      },
      "& .MuiOutlinedInput-root": {
        minHeight: 38.5,
        "& fieldset": {
          border: `1px solid ${GREY}`,
          borderRadius: 20,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
          borderWidth: "1px",
          transition: theme.transitions.create(["border-color", "box-shadow"]),
          // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
          borderColor: theme.palette.primary.main,
        },
        "&.Mui-disabled": {
          //   color: GREY_500,
        },
      },
    },
  })
);
