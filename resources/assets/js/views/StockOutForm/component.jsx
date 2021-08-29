import React, { Component } from "react";
import _ from 'lodash';
import Moment from 'moment';
import NumericLabel from 'react-pretty-numbers';
// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import Autocomplete from "../../components/Autocomplete/Autocomplete.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
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

class StockOutForm extends Component {
  constructor(props) {
    super(props)
    const date = Moment().format('YYYY-MM-DD')
    const number = `OUT-${Moment().format('YYYY/MMM/DD-HH-mm-ss')}`
    this.state = {
      error: '',
      number,
      date,
      remark: '',
      item: '',
      details: [],
      unit: '',
      qty: 0,
      isCreate: false,
      editIndex: -1,
    }
    this.initLoad()
  }

  initLoad = async () => {
    const { fetchDetail, fetchItemIndex, id } = this.props
    try {
      await fetchItemIndex()
      if (id) {
        await fetchDetail({ id }).then(() => {
          const { stockOut } = this.props
          if (stockOut) {
            this.setState({
              number: stockOut.number,
              date: stockOut.date,
              remark: stockOut.remark || '',
              details: stockOut.details ? _.map(stockOut.details, e => ({
                item: {
                  value: e.item.id,
                  label: e.item.name,
                },
                qty: e.qty,
                unit: e.unit,
              })) : [],
            })
          }
        })
      }
    } catch (e) {
      this.setState({ error: 'Get list Error' })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onAutocompleteChange = name => value => {
    if (name === 'item' && value) {
      const { items } = this.props
      const { qty } = this.state
      const item = _.find(items, e => e.id === value.value)
      if (item) {
        this.setState({
          [name]: value,
          unit: item.unit,
        })
      }
      return
    }
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fetchSave, fetchUpdate, history, id } = this.props
    const {
      number,
      date,
      remark,
      details,
    } = this.state
    if (!id) {
      fetchSave({
        number,
        date,
        remark,
        details: _.map(details, e => ({
          item_id: e.item.value,
          qty: e.qty,
          unit: e.unit,
        })),
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/stock-out')
        }
      })
    } else {
      fetchUpdate({
        id,
        number,
        date,
        remark,
        details: _.map(details, e => ({
          item_id: e.item.value,
          qty: e.qty,
          unit: e.unit,
        })),
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/stock-out')
        }
      })
    }
  }

  onSave = id => {
    const {
      item,
      qty,
      unit,
      details,
    } = this.state

    let error = []
    if (!item) {
      error.push('Item cannot be empty!')
    }
    if (!qty || qty === 0) {
      error.push('Count cannot be empty or zero!')
    }
    if (!unit) {
      error.push('Unit cannot be empty!')
    }

    if (error.length > 0) {
      this.props.setError(error.join('\n'))
      return
    }

    if (!id) {
      this.setState({
        details: [
          ...details,
          {
            item,
            qty,
            unit,
          },
        ],
        item: '',
        unit: '',
        qty: 0,
        isCreate: false,
      })
    } else {
      this.setState({
        details: [
          ...details.slice(0, id),
          {
            item,
            qty,
            unit,
          },
          ...details.slice(id + 1),
        ],
        item: '',
        unit: '',
        qty: 0,
        editIndex: -1,
      })
    }
  }

  toggleAdd = () => {
    if (this.state.isCreate) {
      this.setState({
        isCreate: !this.state.isCreate,
        item: '',
        unit: '',
        qty: 0,
      })
    } else {
      this.setState({
        isCreate: !this.state.isCreate,
        item: '',
        unit: '',
        qty: 0,
      })
    }
  }

  toggleEdit = (id, param) => {
    const { item, unit, qty } = param || {}
    let editIndex = -1
    if (id || id === 0) editIndex = id
    if (this.state.isCreate) {
      this.setState({ isCreate: false }, () => {
        this.setState({
          editIndex,
          item,
          unit,
          qty,
        })
      })
    } else {
      this.setState({
        editIndex,
        item: item || '',
        unit: unit || '',
        qty: qty || 0,
      })
    }
  }

  triggerDialog = (id, name) => {
    const { openDialog, fetchDelete } = this.props
    openDialog({
      title: `Hapus "${name}" dari Detail?`,
      body: '',
      action: () => {
        this.setState({
          details: [
            ...this.state.details.slice(0, id),
            ...this.state.details.slice(id + 1),
          ],
        })
      }
    })
  }

  renderTableData = items => {
    const { classes } = this.props;
    const {
      perPage,
      isCreate,
      editIndex,
      details,
      item,
      unit,
      qty,
    } = this.state;

    let tableData = []
    let pagination = {}
    if (isCreate) {
      tableData = [[
        '',
        <Autocomplete
          id="item"
          name="item"
          suggestions={items}
          inputProps={{
            autoFocus: true,
            value: item,
            onChange: this.onAutocompleteChange('item'),
          }}
          formControlProps={{
            fullWidth: true,
            className: classes.width200,
          }}
          placeholder="Pilih Produk..."
        />,
        <CustomInput
          id="qty"
          name="qty"
          inputProps={{
            value: qty,
            onChange: this.onChange,
            type: 'number',
          }}
          formControlProps={{
            fullWidth: true,
            className: classes.width100,
          }}
        />,
        <CustomInput
          id="unit"
          name="unit"
          inputProps={{
            value: unit,
            onChange: this.onChange,
          }}
          formControlProps={{
            fullWidth: true,
            className: classes.width100,
          }}
        />,
        <div className={classes.width75}>
          <IconButton
            aria-label="Save"
            title="Simpan"
            className={classes.tableActionButton}
            onClick={() => this.onSave()}
          >
            <Check
              className={
                classes.tableActionButtonIcon + " " + classes.edit
              }
            />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            title="Batal"
            className={classes.tableActionButton}
            onClick={this.toggleAdd}
          >
            <Cancel
              className={
                classes.tableActionButtonIcon + " " + classes.close
              }
            />
          </IconButton>
        </div>,
      ]]
    }
    if (details) {
      let idx = 1
      tableData.push(..._.map(details, (row, key) => {
        if (editIndex === key) {
          return [
            idx++,
            <Autocomplete
              id="item"
              name="item"
              suggestions={items}
              inputProps={{
                autoFocus: true,
                value: item,
                onChange: this.onAutocompleteChange('item'),
              }}
              formControlProps={{
                fullWidth: true,
                className: classes.width200,
              }}
              placeholder="Pilih Produk..."
            />,
            <CustomInput
              id="qty"
              name="qty"
              inputProps={{
                value: qty,
                onChange: this.onChange,
                type: 'number',
              }}
              formControlProps={{
                fullWidth: true,
                className: classes.width100,
              }}
            />,
            <CustomInput
              id="unit"
              name="unit"
              inputProps={{
                value: unit,
                onChange: this.onChange,
              }}
              formControlProps={{
                fullWidth: true,
                className: classes.width100,
              }}
            />,
            (
              <div className={classes.width75}>
                <IconButton
                  aria-label="Save"
                  title="Simpan"
                  className={classes.tableActionButton}
                  onClick={() => { this.onSave(key) }}
                >
                  <Check
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="Close"
                  title="Batal"
                  className={classes.tableActionButton}
                  onClick={this.toggleEdit}
                >
                  <Cancel
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </div>
            ),
          ]
        } else {
          return [
            idx++,
            row.item ? row.item.label : '',
            row.qty,
            row.unit,
            (
              <div>
                <IconButton
                  aria-label="Edit"
                  title="Ubah"
                  className={classes.tableActionButton}
                  onClick={() => this.toggleEdit(key, row)}
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
                  onClick={() => this.triggerDialog(key, row.item ? row.item.label : 'item')}
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
        }
      }))

      // pagination = {
      //   page: categories.current_page || page,
      //   rowsPerPage: perPage,
      //   total: categories.total || categories.data.length,
      //   handleChangePage: (event, page) => {
      //     this.setState({ page: page + 1 }, this.getList);
      //   },
      //   handleChangeRowsPerPage: event => {
      //     this.setState({ perPage: event.target.value }, this.getList);
      //   },
      // }
    }

    return {
      tableData,
      pagination,
    }
  }

  render() {
    const { classes, history, items, onLoading } = this.props;
    const { number, date, remark, isCreate } = this.state;

    const itemLists = items && items.length > 0 ? _.map(items, i => ({ value: i.id, label: i.name })) : []
    const { tableData, pagination } = this.renderTableData(itemLists)

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={this.handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Input Barang Keluar
                  {
                    onLoading
                    ? (
                      <CircularProgress
                        style={{
                          float: 'right',
                          color: 'white',
                        }}
                      />
                    ) : null
                  }
                </h4>
                <p className={classes.cardCategoryWhite}>Lengkapi Detail Barang Keluar</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nomor Resi"
                      id="number"
                      name="number"
                      inputProps={{
                        value: number,
                        onChange: this.onChange,
                        autoFocus: true,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tanggal"
                      id="date"
                      name="date"
                      inputProps={{
                        value: date,
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
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Catatan"
                      id="remark"
                      name="remark"
                      inputProps={{
                        value: remark,
                        onChange: this.onChange,
                        multiline: true,
                        rows: 3
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <h5 className={classes.header}>
                      Detail
                      {
                        isCreate ?
                          <Button color="info" onClick={this.toggleAdd}>
                            Batal
                            <Cancel style={{ marginLeft: '5px' }} />
                          </Button>
                          :
                          <Button color="info" onClick={this.toggleAdd}>
                            Tambah Produk
                            <Add style={{ marginLeft: '5px' }} />
                          </Button>
                      }
                    </h5>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["No.", "Produk", "Jumlah", "Satuan", ""]}
                      tableData={tableData}
                    // pagination={pagination}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={() => { history.goBack() }}>Kembali</Button>
                <Button color="primary" type="submit">Simpan</Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer >
    );
  }
}

export default StockOutForm;
