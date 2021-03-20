import { Avatar, TextField, TextFieldProps } from "@material-ui/core";
import { ContextStore } from "App";
import React from "react";
import { useStylesAvatar, useStylesForm } from "./classes";
import { getNameAvatar } from "components/utils";

interface Props extends Omit<TextFieldProps, "onChange"> {
  hide?: boolean;
  onChange?: (text: string) => void;
  className?: string;
}

const CommentFiled = (props: Props) => {
  const { hide = false, onChange, className } = props;
  const classes = useStylesAvatar();
  const classesTextField = useStylesForm();
  const [value, setValue] = React.useState("");
  const { globalState, dispatch } = React.useContext(ContextStore);
  if (hide) {
    return null;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange && onChange(value);
        setValue("");
      }}
    >
      <div className={`d-flex ${className}`}>
        <Avatar
          className={`${classes.root} ${
            classes[`avatar_${globalState.userData?.user_id % 4}`]
          }`}
        >
          {getNameAvatar(globalState.userData?.name)}
        </Avatar>
        <TextField
          name="message"
          fullWidth
          placeholder={"write a comment"}
          className={classesTextField.bootstrap}
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default CommentFiled;
