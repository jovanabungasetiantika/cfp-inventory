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

class StockInForm extends Component {
  constructor(props) {
    super(props)
    const date = Moment().format('YYYY-MM-DD')
    const number = `IN-${Moment().format('YYYY/MMM/DD-HH-mm-ss')}`
    this.state = {
      error: '',
      number,
      date,
      remark: '',
      item: '',
      details: [],
      price: 0,
      unit: '',
      qty: 0,
      total: 0,
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
          const { stockIn } = this.props
          if (stockIn) {
            this.setState({
              number: stockIn.number,
              date: stockIn.date,
              remark: stockIn.remark || '',
              details: stockIn.details ? _.map(stockIn.details, e => ({
                item: {
                  value: e.item.id,
                  label: e.item.name,
                },
                price: e.price,
                qty: e.qty,
                unit: e.unit,
                total: e.total,
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
    if (e.target.name === 'price'
      || e.target.name === 'qty') {
      const { price, qty } = this.state
      let total = 0
      if (e.target.name === 'price') {
        total = e.target.value * qty
      } else {
        total = e.target.value * price
      }
      this.setState({
        [e.target.name]: e.target.value,
        total,
      })
      return
    }
    if(e.target.name === 'date') {
      this.setState({
        number: `IN-${Moment(e.target.value).format('YYYY/MMM/DD-HH-mm-ss')}`
      })
    }
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
          price: item.price,
          unit: item.unit,
          total: item.price * qty
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

    let error = []
    if (!number) {
      error.push('Number cannot be empty!')
    }

    if (!date) {
      error.push('Date cannot be empty!')
    }

    if (details.length === 0) {
      error.push('Details cannot be empty!')      
    }

    if (error.length > 0) {
      this.props.setError(error.join('\n'))
      return
    }

    if (!id) {
      fetchSave({
        number,
        date,
        remark,
        details: _.map(details, e => ({
          item_id: e.item.value,
          qty: e.qty,
          price: e.price,
          unit: e.unit,
          total: e.total
        })),
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/stock-in')
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
          price: e.price,
          unit: e.unit,
          total: e.total
        })),
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/stock-in')
        }
      })
    }
  }

  onSave = id => {
    const {
      item,
      price,
      qty,
      unit,
      total,
      details,
    } = this.state

    let error = []
    if (!item) {
      error.push('Item cannot be empty!')
    }
    if (!price || price === 0) {
      error.push('Price cannot be empty or zero!')
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
            price,
            qty,
            unit,
            total,
          },
        ],
        item: '',
        price: 0,
        unit: '',
        qty: 0,
        total: 0,
        isCreate: false,
      })
    } else {
      this.setState({
        details: [
          ...details.slice(0, id),
          {
            item,
            price,
            qty,
            unit,
            total,
          },
          ...details.slice(id + 1),
        ],
        item: '',
        price: 0,
        unit: '',
        qty: 0,
        total: 0,
        editIndex: -1,
      })
    }
  }

  toggleAdd = () => {
    if (this.state.isCreate) {
      this.setState({
        isCreate: !this.state.isCreate,
        item: '',
        price: 0,
        unit: '',
        qty: 0,
        total: 0,
      })
    } else {
      this.setState({
        isCreate: !this.state.isCreate,
        item: '',
        price: 0,
        unit: '',
        qty: 0,
        total: 0,
      })
    }
  }

  toggleEdit = (id, param) => {
    const { item, price, unit, qty, total } = param || {}
    let editIndex = -1
    if (id || id === 0) editIndex = id
    if (this.state.isCreate) {
      this.setState({ isCreate: false }, () => {
        this.setState({
          editIndex,
          item,
          price,
          unit,
          qty,
          total,
        })
      })
    } else {
      this.setState({
        editIndex,
        item: item || '',
        price: price || 0,
        unit: unit || '',
        qty: qty || 0,
        total: total || 0,
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
      price,
      unit,
      qty,
      total,
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
          id="price"
          name="price"
          inputProps={{
            value: price,
            onChange: this.onChange,
            type: 'number',
          }}
          formControlProps={{
            fullWidth: true,
            className: classes.width100,
          }}
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
        <CustomInput
          id="total"
          name="total"
          disabled
          inputProps={{
            value: total,
            onChange: this.onChange,
            type: 'number',
            disabled: true,
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
              id="price"
              name="price"
              inputProps={{
                value: price,
                onChange: this.onChange,
                type: 'number',
              }}
              formControlProps={{
                fullWidth: true,
                className: classes.width100,
              }}
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
            <CustomInput
              id="total"
              name="total"
              disabled
              inputProps={{
                value: total,
                onChange: this.onChange,
                type: 'number',
                disabled: true,
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
            <NumericLabel params={numberOptions}>{row.price}</NumericLabel>,
            row.qty,
            row.unit,
            <NumericLabel params={numberOptions}>{row.total}</NumericLabel>,
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
                  Input Barang Masuk
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
                <p className={classes.cardCategoryWhite}>Lengkapi Detail Barang Masuk</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} >
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
                  <GridItem xs={12} sm={12} md={6} >
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
                  <GridItem xs={12} sm={12} md={12} >
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
                      tableHead={["No.", "Produk", "Harga", "Jumlah", "Satuan", "Harga Total", ""]}
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

export default StockInForm;
