import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination"
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle";

import TablePaginationActions from '../TablePaginationActions/TablePaginationAction'

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, pagination, isLoading } = props;

  const rowsPerPage = pagination ? pagination.rowsPerPage : 5
  const emptyRows = Math.max(0, rowsPerPage - tableData.length);

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                const wideCell = key === 1 ? ` ${classes.wideCell}` : ''
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell + wideCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {
            tableData && tableData.length > 0 ?
              tableData.map((prop, key) => {
                return (
                  <TableRow key={key}>
                    {prop.map((prop, key) => {
                      const wideCell = key === 1 ? ` ${classes.wideCell}` : ''
                      return (
                        <TableCell className={classes.tableCell + wideCell} key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
              :
              <TableRow>
                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} colSpan={tableHead ? tableHead.length : 1}>
                  {
                    isLoading
                    ? 'Sedang membaca data...'
                    : 'Tidak ada data terbaca.'
                  }
                </TableCell>
              </TableRow>
          }
          {emptyRows > 0 ? (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={tableHead ? tableHead.length : 1} />
            </TableRow>
          ) : null}
        </TableBody>
        {
          pagination ?
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage={'Baris per halaman'}
                  colSpan={tableHead.length}
                  count={pagination.total}
                  rowsPerPage={pagination.rowsPerPage}
                  page={pagination.page - 1}
                  onChangePage={pagination.handleChangePage}
                  onChangeRowsPerPage={pagination.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
            : null
        }
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};

export default withStyles(tableStyle)(CustomTable);
