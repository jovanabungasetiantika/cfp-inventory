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

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      perPage: 5,
      page: 1,
      name: '',
    }
    this.getList()
  }

  getList = async () => {
    const { fetchIndex } = this.props
    const { page, perPage, name } = this.state
    try {
      await fetchIndex(page, perPage, { name })
    } catch (e) {
      this.setState({ error: 'Get list Error' })
    }
  }

  addClick = () => {
    const { history } = this.props
    history.push('/item/create')
  }

  editClick = id => {
    const { history } = this.props
    if (id) {
      history.push(`/item/edit/${id}`)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  triggerDialog = (id, name) => {
    const { openDialog, fetchDelete } = this.props
    openDialog({
      title: `Hapus "${name}" dari Produk?`,
      body: '',
      action: async () => {
        await fetchDelete({ id }).then(this.getList)
      }
    })
  }

  renderTableData = () => {
    const { classes, items } = this.props;
    const { perPage } = this.state;

    let tableData = []
    let pagination
    if (items && items.data) {
      let count = items.from || 1
      tableData.push(..._.map(items.data, row => {
        return [
          count++,
          row.name,
          row.category.name,
          row.unit,
          <NumericLabel params={numberOptions}>{row.price}</NumericLabel>,
          Moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss'),
          (
            <div>
              <IconButton
                aria-label="Edit"
                title="Ubah"
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
                title="Hapus"
                className={classes.tableActionButton}
                onClick={() => this.triggerDialog(row.id, row.name)}
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
        page: items.current_page || page,
        rowsPerPage: perPage,
        total: items.total || items.data.length,
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
    const { classes, onLoading } = this.props;
    const { isCreate, name } = this.state;

    const { tableData, pagination } = this.renderTableData()

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Produk</h4>
              {/* <p className={classes.cardItemWhite}>
              </p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4} lg={2}>
                  <Button
                    color="primary"
                    onClick={this.addClick}
                  >
                    {isCreate ? 'Batalkan' : 'Tambah Baru'}
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={8}>
                  <CustomInput
                    labelText="Cari Produk"
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
                <GridItem xs={12} sm={12} md={4} lg={2}>
                  <Button
                    color="info"
                    onClick={this.getList}
                  >
                    Cari
                  </Button>
                </GridItem>
              </GridContainer>
              <Table
                isLoading={onLoading}
                tableHeaderColor="primary"
                tableHead={["No.", "Nama Produk", "Kategori", "Satuan", "Harga", "Tanggal Input", ""]}
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

export default Item;
