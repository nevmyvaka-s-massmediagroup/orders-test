import React from "react";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: "88px",
      height: "19px",
      fontSize: "14px",
      borderRadius: "10px",
      fontWeight: 500,
    },
    open: {
      backgroundColor: "#CDFFCD",
      color: "#007F00",
    },
    cancelled: {
      backgroundColor: "#FFE0E0",
      color: "#D30000",
    },
    shipped: {
      backgroundColor: "#E6E6F2",
      color: "#4A4AFF",
    },
    dot: {
        margin: '0 5px 0 5px',
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      color: "inherit",
    },
    dotOpen: {
      backgroundColor: "#007F00",
    },
    dotCancelled: {
      backgroundColor: "#D30000",
    },
    dotShipped: {
      backgroundColor: "#4A4AFF",
    },
  })
);

const ShippingStatus = (status: string) => {
  const classes = useStyles();
  switch (status) {
    case "shipped":
      return (
        <div className={clsx(classes.root, classes.shipped)}>
          <div className={clsx(classes.dotShipped, classes.dot)} />
          {status}
        </div>
      );
    case "cancelled":
      return (
        <div className={clsx(classes.root, classes.cancelled)}>
          <div className={clsx(classes.dotCancelled, classes.dot)} />
          {status}
        </div>
      );
    case "open":
      return (
        <div className={clsx(classes.root, classes.open)}>
          <div className={clsx(classes.dotOpen, classes.dot)} />
          {status}
        </div>
      );
    default:
      break;
  }
};

export default ShippingStatus;
