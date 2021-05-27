import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { useTableStyles } from "./OrderTable";
import { Order as OrderType } from "../../utils/sorting/sortUtils";
import { OrderTableType } from "../../types/order";
import { Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface HeadCell {
  id: keyof OrderTableType;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: "orderDate",
    label: "ORDER NUMBER & DATE",
  },
  { id: "shippingDate", label: "Shipping Status" },
  { id: "address", label: "CUSTOMER ADDRESS" },
  { id: "value", label: "ORDER VALUE" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useTableStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OrderTableType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderType;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof OrderTableType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "value" ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                style={{ color: "#6E6893", fontWeight: 600, fontSize: "12px" }}
              >
                {headCell.label.toUpperCase()}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <MoreVertIcon style={{ color: "#8B83BA" }} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
