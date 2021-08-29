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

class StockDetail extends Component {
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
    }
    this.getList()
  }

  getList = async () => {
    const { fetchDetailIndex, fetchItemDetail, id } = this.props
    const { page, perPage, dateFirst, dateLast } = this.state
    try {
      await fetchItemDetail({ id })
      await fetchDetailIndex(page, perPage, { dateFirst, dateLast, id })
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
    const { perPage } = this.state;

    let tableData = []
    let pagination
    if (stocks && stocks.data) {
      let count = stocks.from || 1
      tableData.push(..._.map(stocks.data, row => {
        return [
          count++,
          Moment(row.date).format('DD/MM/YYYY'),
          row.inQty,
          row.outQty,
          row.finalQty,
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
    const { id } = this.props
    const { dateFirst, dateLast } = this.state
    await this.props.stockReportDetail({ dateFirst, dateLast, id })
  }

  render() {
    const { classes, item } = this.props;
    const { dateFirst, dateLast } = this.state;

    const { tableData, pagination } = this.renderTableData()

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Kartu Stok{ item && item.name ? ` ${item.name}` : null }</h4>
              {/* <p className={classes.cardItemWhite}>
              </p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Tanggal Awal"
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
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Tanggal Akhir"
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
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    color="info"
                    onClick={this.getList}
                    style={{
                      marginTop: '30px',
                    }}
                  >
                    Cari
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.reportGenerate}
                    style={{
                      marginTop: '30px',
                    }}
                  >
                    Lihat Laporan
                  </Button>
                </GridItem>
              </GridContainer>
              <Table
                tableHeaderColor="primary"
                tableHead={["No.", "Tanggal", "Jumlah Masuk", "Jumlah Keluar", "Jumlah Akhir"]} //, "Action", "Date"
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

export default StockDetail;
