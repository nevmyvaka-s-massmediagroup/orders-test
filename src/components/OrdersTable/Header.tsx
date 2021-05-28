import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const AntTabs = withStyles({
  root: {
    position: "relative",
    borderBottom: "1px solid #C6C2DE",
  },
  indicator: {
    backgroundColor: "#25213B",
  },
})(Tabs);

interface Props {
  totalOrders: number;
}

interface StyledTabProps {
  label: string;
}

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 32,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      "&:hover": {
        color: "#25213B",
        opacity: 1,
      },
      "&$selected": {
        color: "#25213B",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#25213B",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3)
  },
  headerRoot: {
    position: "relative",
    backgroundColor: '#F2F0F9',
    marginBottom: '20px'
  },

  totalOrdersText: {
    color: "#6E6893",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "16.94px",
  },
  totalOrderNumber: {
    color: "#6D5BD0",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "21.78px",
  },
}));

export const Header: React.FC<Props> = ({ totalOrders }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.headerRoot}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="All" />
        <AntTab label="Shipped" />
        <Box position="absolute" top="5px" right="5px">
          <Typography className={classes.totalOrdersText}>
            Total orders:{" "}
            <span className={classes.totalOrderNumber}>${totalOrders}</span> USD
          </Typography>
        </Box>
      </AntTabs>
    </div>
  );
};
