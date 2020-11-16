import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

const primary = "#c30000";
const primaryLight = "#3f404e";
const secondary = "#ed1d24";
const bodyBackground = "#3c3d4f";

const MarvelTheme = createMuiTheme({
  palette: {
    primary: {
      light: primaryLight,
      main: primary,
      dark: primary,
    },
    secondary: {
      light: secondary,
      main: secondary,
      dark: secondary,
    },
    marvel: {
      bodyBackground: bodyBackground,
    },
    type: "dark",
  },
  status: {
    danger: "orange",
  },
});

export default MarvelTheme;
