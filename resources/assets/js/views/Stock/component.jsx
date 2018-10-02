import React, { Component } from "react";
import _ from 'lodash';
import Moment from 'moment';
import NumericLabel from 'react-pretty-numbers';
import { Link } from 'react-router-dom';
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

class Stock extends Component {
  constructor(props) {
    super(props)
    const currentDate = Moment()
    const dateLast = currentDate.format('YYYY-MM-DD')
    currentDate.subtract(1, 'months')
    const dateFirst = currentDate.format('YYYY-MM-DD')
    this.state = {
      error: '',
      dateFirst,
      dateLast,
      perPage: 5,
      page: 1,
      name: '',
    }
    this.getList()
  }

  getList = async () => {
    const { fetchIndex } = this.props
    const { page, perPage, dateFirst, dateLast, name } = this.state
    try {
      await fetchIndex(page, perPage, { dateFirst, dateLast, item: name })
    } catch (e) {
      this.setState({ error: 'Get list Error' })
    }
  }

  addClick = () => {
    const { history } = this.props
    history.push('/stock-in/create')
  }

  editClick = id => {
    const { history } = this.props
    if (id) {
      history.push(`/stock-in/edit/${id}`)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderTableData = () => {
    const { classes, stocks } = this.props;
    const { perPage, page } = this.state;

    let tableData = []
    let pagination
    if (stocks && stocks.data && !stocks.count) {
      let count = stocks.from || 1
      tableData.push(..._.map(stocks.data, row => {
        return [
          count++,
          <Link to={`/stock-on-hand/${row.id}`} >{row.name}</Link>,
          row.unit,
          row.qty,
          <NumericLabel params={numberOptions}>{row.qty * row.price}</NumericLabel>,
          row.inQty,
          <NumericLabel params={numberOptions}>{row.inPrice}</NumericLabel>,
          row.outQty,
          <NumericLabel params={numberOptions}>{row.outPrice}</NumericLabel>,
          Number(row.qty) + Number(row.inQty) - row.outQty,
          <NumericLabel params={numberOptions}>{(Number(row.qty) + Number(row.inQty) - row.outQty) * row.price}</NumericLabel>,
          // Moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss'),
        ]
      }))

      pagination = {
        page: stocks.current_page || page,
        rowsPerPage: perPage,
        total: stocks.total || stocks.data.length,
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

  reportGenerate = async () => {
    const { dateFirst, dateLast } = this.state
    await this.props.stockReport({ dateFirst, dateLast })
  }

  reportStockCardGenerate = async () => {
    const { dateFirst, dateLast } = this.state
    await this.props.stockCardReport({ dateFirst, dateLast })
  }

  render() {
    const { classes } = this.props;
    const { dateFirst, dateLast, name } = this.state;

    const { tableData, pagination } = this.renderTableData()

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Stock</h4>
              {/* <p className={classes.cardItemWhite}>
              </p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Start Date"
                        id="dateFirst"
                        name="dateFirst"
                        inputProps={{
                          value: dateFirst,
                          onChange: this.onChange,
                          type: 'date',
                        }}
                        labelProps={{
                          shrink: true,
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="End Date"
                        id="dateLast"
                        name="dateLast"
                        inputProps={{
                          value: dateLast,
                          onChange: this.onChange,
                          type: 'date',
                        }}
                        labelProps={{
                          shrink: true,
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4} lg={12}>
                      <CustomInput
                        labelText="Search"
                        id="name"
                        name="name"
                        inputProps={{
                          value: name,
                          onChange: this.onChange,
                        }}
                        labelProps={{
                          shrink: true,
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    color="primary"
                    onClick={this.getList}
                  >
                    Filter
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.reportGenerate}
                  >
                    Generate Report
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.reportStockCardGenerate}
                  >
                    Generate All Stock Cards
                  </Button>
                </GridItem>
              </GridContainer>
              <Table
                tableHeaderColor="primary"
                tableHead={["No.", "Item Name", "Unit", "Balance Qty", "Balance Price", "In Qty", "In Price/Unit", "Out Qty", "Out Price/Unit", "Total Qty", "Total Price"]} //, "Action", "Date"
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

export default Stock;
