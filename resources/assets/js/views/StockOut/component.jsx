import React, { Component } from "react";
import _ from 'lodash';
import Moment from 'moment';
import NumericLabel from 'react-pretty-numbers';
// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";

const numberOptions = {
  justification: 'L',
  currency: true,
  currencyIndicator: 'IDR',
  locales: 'id-ID',
}

class StockOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      perPage: 5,
      page: 1,
    }
    this.getList()
  }

  getList = async () => {
    const { fetchIndex } = this.props
    const { page, perPage } = this.state
    try {
      await fetchIndex(page, perPage)
    } catch (e) {
      this.setState({ error: 'Get list Error' })
    }
  }

  addClick = () => {
    const { history } = this.props
    history.push('/stock-out/create')
  }

  editClick = id => {
    const { history } = this.props
    if (id) {
      history.push(`/stock-out/edit/${id}`)
    }
  }

  navigateToReport = () => {
    const { history } = this.props
    history.push('/stock-out/report')
  }

  triggerDialog = (id, name) => {
    const { openDialog, fetchDelete } = this.props
    openDialog({
      title: `Remove "${name}" from Stock Out?`,
      body: '',
      action: async () => {
        await fetchDelete({ id }).then(this.getList)
      }
    })
  }

  renderTableData = () => {
    const { classes, stocksOut } = this.props;
    const { perPage } = this.state;

    let tableData = []
    let pagination
    if (stocksOut && stocksOut.data) {
      let count = stocksOut.from || 1
      tableData.push(..._.map(stocksOut.data, row => {
        return [
          count++,
          row.number,
          row.remark,
          row.date,
          row.details_count,
          Moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss'),
          (
            <div>
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
                onClick={() => this.editClick(row.id)}
              >
                <Edit
                  className={
                    classes.tableActionButtonIcon + " " + classes.edit
                  }
                />
              </IconButton>
              <IconButton
                aria-label="Close"
                className={classes.tableActionButton}
                onClick={() => this.triggerDialog(row.id, row.number)}
              >
                <Close
                  className={
                    classes.tableActionButtonIcon + " " + classes.close
                  }
                />
              </IconButton>
            </div>
          ),
        ]
      }))

      pagination = {
        page: stocksOut.current_page || page,
        rowsPerPage: perPage,
        total: stocksOut.total || stocksOut.data.length,
        handleChangePage: (event, page) => {
          this.setState({ page: page + 1 }, this.getList);
        },
        handleChangeRowsPerPage: event => {
          this.setState({ perPage: event.target.value }, this.getList);
        },
      }
    }

    return {
      tableData,
      pagination,
    }
  }

  render() {
    const { classes } = this.props;
    const { isCreate } = this.state;

    const { tableData, pagination } = this.renderTableData()

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Stock Out</h4>
              {/* <p className={classes.cardItemWhite}>
              </p> */}
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                onClick={this.addClick}
              >
                {isCreate ? 'Cancel' : 'Add New'}
              </Button>
              <Button
                color="primary"
                onClick={this.navigateToReport}
                style={{
                  float: 'right',
                }}
              >
                Stock Out Report
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={["No.", "Number", "Remark", "Date", "Total Items In", "Created Date", "Action"]}
                tableData={tableData}
                pagination={pagination}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default StockOut;
