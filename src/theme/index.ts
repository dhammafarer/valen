import { makeTheme } from "primithemes";
import { darken, lighten } from "../utils/helpers";

const primary = "#2A313D";
const secondary = "#ED1C24";

export const theme = makeTheme({
  fonts: {
    sans: "Muli",
  },
  colors: {
    primary: {
      dark: darken(primary)(1 / 4),
      main: primary,
      light: lighten(primary)(1 / 4),
      contrast: "rgba(255,255,255,0.85)",
    },
    secondary: {
      dark: darken(secondary)(1 / 4),
      main: secondary,
      light: lighten(secondary)(1 / 4),
      contrast: "rgba(255,255,255,0.85)",
    },
  },
});
