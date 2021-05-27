import { createMuiTheme } from "@material-ui/core/styles";

const StripesColor = '#F4F2FF'

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  props: {
    MuiTablePagination: {
      style: {
        background: StripesColor,
      }
    },
    MuiTableHead: {
      style: {
        background: StripesColor,
      }
    }
  }
});
