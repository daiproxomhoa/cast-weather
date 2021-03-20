import {
  CircularProgress,
  CircularProgressProps,
  PropTypes,
} from "@material-ui/core";

interface Props extends CircularProgressProps {
  loadingColor?: PropTypes.Color;
}

const LoadingIcon = (props: Props) => {
  const { loadingColor, style, ...rest } = props;
  return (
    <CircularProgress
      size={16}
      color={
        loadingColor || loadingColor === "default" ? "primary" : rest.color
      }
      {...rest}
    />
  );
};
export default LoadingIcon;
