import {
  FormControl,
  InputLabel,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import { debounce, isEqual } from "lodash";
import React, { ReactNode } from "react";
import { BLUE, PRIMARY } from "../common/colors";
import { some } from "../common/utils";

const autocompleteCS = makeStyles(() => ({
  endAdornment: {
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
  },
  option: {
    padding: 0,
  },
  paper: {
    padding: 2,
  },
}));
type T = some

export interface FormControlAutoCompletePropsBase {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  error?: boolean;
  placeholder?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  required?: boolean;
  loadOptions?: (input: string) => Promise<T[]>;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  readOnly?: boolean;
  multiple?: boolean;
  onChangeInput?: any;
  options?: T[];
  getOptionLabel: (option: some) => string;
}

export interface FormControlAutoCompleteProps
  extends FormControlAutoCompletePropsBase,
    some {
  innerRef?: React.RefObject<HTMLDivElement>;
}

function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const FormControlAutoComplete: (
  prop: FormControlAutoCompleteProps
) => React.ReactElement<FormControlAutoCompleteProps> = (props) => {
  const {
    id,
    label,
    placeholder,
    error,
    formControlStyle,
    required,
    renderInput,
    options = [],
    loadOptions,
    getOptionLabel,
    startAdornment,
    endAdornment,
    inputStyle,
    labelStyle,
    innerRef,
    readOnly,
    onChangeInput,
    multiple,
    defaultText,
    ...rest
  } = props;
  const classesComplete = autocompleteCS(props);

  const [firstOption, setFirstOption] = React.useState<typeof options>(options);
  const [optionsTmp, setOption] = React.useState<typeof options>(options);
  const previous = usePrevious(optionsTmp);
  const [focus, setFocus] = React.useState(false);

  const onLoadOptions = debounce(
    async (input: string) => {
      if (loadOptions) {
        if (input) {
          const data = await loadOptions(input);
          if (data && data.length > 0) {
            setOption(data);
            return;
          }
        }
        setOption(firstOption);
      }
    },
    500,
    {
      trailing: true,
      leading: false,
    }
  );

  const onFirstLoadOptions = debounce(
    async (input: string) => {
      if (loadOptions) {
        const data = await loadOptions(input);
        if (data && data.length > 0) {
          setOption(data);
          setFirstOption(data);
        }
      }
    },
    500,
    {
      trailing: true,
      leading: false,
    }
  );

  React.useEffect(() => {
    if (loadOptions && options?.length === 0) {
      onFirstLoadOptions(defaultText);
    } else {
      setOption(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!loadOptions && previous !== options) {
      setOption(options);
    }
  }, [loadOptions, options, previous]);

  return (
    <FormControl
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={formControlStyle}
      error={error}
      fullWidth
    >
      {label && (
        <InputLabel
          shrink
          htmlFor={id}
          style={{
            marginBottom: 4,
            position: "relative",
            color: focus ? PRIMARY : undefined,
            ...labelStyle,
          }}
        >
          {label}
        </InputLabel>
      )}
      <Autocomplete
        id={id}
        classes={{
          endAdornment: classesComplete.endAdornment,
          option: classesComplete.option,
          paper: classesComplete.paper,
        }}
        size="small"
        options={(optionsTmp as any) || []}
        onInputChange={(event: any, value: string, reason: string) => {
          reason === "input" && loadOptions && onLoadOptions(value);
          (reason === "clear" || value === "") &&
            loadOptions &&
            setOption(options?.length ? options : firstOption);
        }}
        noOptionsText={"noOption"}
        renderInput={
          renderInput ||
          ((params) => (
            <TextField
              {...params}
              inputRef={innerRef}
              placeholder={placeholder}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "off",
                style: { padding: 8 },
              }}
              InputProps={{
                ...params.InputProps,
                readOnly,
                style: {
                  // minHeight: 32,
                  padding: 0,
                  ...inputStyle,
                },
                startAdornment: (
                  <>
                    {startAdornment}
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    {endAdornment}
                  </>
                ),
              }}
              onChange={onChangeInput}
              size="small"
              error={error}
            />
          ))
        }
        getOptionLabel={(option: any) =>
          getOptionLabel ? getOptionLabel(option) : option.label
        }
        getOptionSelected={(option: some, value: some) =>
          isEqual(option, value)
        }
        renderOption={(option, { selected }) => (
          <ListItem
            role={undefined}
            dense
            button
            style={{
              background: selected ? grey[500] : undefined,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="body2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {getOptionLabel ? getOptionLabel(option) : option?.label}
            </Typography>
            <DoneIcon
              style={{
                opacity: 0.6,
                width: 18,
                height: 18,
                visibility: selected ? "visible" : "hidden",
                color: BLUE,
                justifySelf: "flex-end",
              }}
            />
          </ListItem>
        )}
        autoComplete
        {...rest}
      />
    </FormControl>
  );
};

export default FormControlAutoComplete;
