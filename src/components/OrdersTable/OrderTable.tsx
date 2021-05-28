import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { EnhancedTableToolbar } from "./EnchancedTableToolbar";
import {
  getComparator,
  Order as OrderType,
  stableSort,
} from "../../utils/sorting/sortUtils";
import { EnhancedTableHead } from "./EnchancedTableHead";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Order, OrderTableType } from "../../types/order";
import { getDataForOrderTable } from "../../utils/DataManipulations/dataParse";
import { DateFormats, formatDate } from "../../utils/Dates/dateManipulations";
import ShippingStatus from "../ShippingStatus";
import { Header } from "./Header";

export const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "1100px",
    },
    paper: {
      width: "1100px",
      marginBottom: theme.spacing(2),
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    orderDateText: {
      fontWeight: 400,
      lineHeight: "16.94px",
      letterSpacing: "5%",
      fontSize: "14px",
      color: "#6E6893",
    },
    shippingDateText: {
      fontWeight: 500,
      lineHeight: "14.52px",
      letterSpacing: "5%",
      fontSize: "12px",
      color: "#6E6893",
    },
  })
);

interface EnhancedTableProps {
  orders: Order[];
  page: number;
  setPage: (page: number) => void;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  orders,
  setPage,
  page,
}) => {
  const rows: OrderTableType[] = getDataForOrderTable(orders);
  const classes = useTableStyles();
  const [order, setOrder] = React.useState<OrderType>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof OrderTableType>("orderDate");
  const [selected, setSelected] = React.useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const totalOrders = () => {
    let result = 0;
    rows.forEach((order) => {
      result += order.value;
    });
    return Math.round(result);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OrderTableType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.orderNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    orderNumber: number
  ) => {
    const selectedIndex = selected.indexOf(orderNumber);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (orderNumber: number) =>
    selected.indexOf(orderNumber) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <Header totalOrders={totalOrders()} />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                // rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderNumber as number);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.orderNumber as number)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderNumber}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <b># {row.orderNumber}</b> <br />
                        <span className={classes.orderDateText}>
                          Ordered:{" "}
                          {formatDate(
                            DateFormats["Mm. D, YYYY"],
                            row.orderDate
                          )}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <ShippingStatus status={row.status} />
                        {/* {row.status} */}
                        <p className={classes.shippingDateText}>
                          Updated:
                          {formatDate(
                            DateFormats["DD/MMM/YYYY"],
                            row.shippingDate
                          )}
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        <b>
                          {row.address} <br />
                          {row.address2}
                        </b>
                      </TableCell>
                      <TableCell align="right">
                        <b>${row.value}</b> <br />
                        {row.currency}
                      </TableCell>
                      <TableCell align="right">
                        <MoreVertIcon style={{ color: "#8B83BA" }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{
            backgroundColor: "#F4F2FF",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            // fontSize: '12px',
            color: "#6E6893",
            fontWeight: 600,
            lineHeight: "14.52px",
            letterSpacing: "5%",
          }}
          rowsPerPageOptions={[2, 5, 8]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EnhancedTable;
