import React, { Component } from "react";
import _ from 'lodash';
import Moment from 'moment';
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

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      perPage: 5,
      page: 1,
      isCreate: false,
      editIndex: 0,
      name: '',
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSave = async id => {
    const { fetchSave, fetchUpdate } = this.props
    const { name } = this.state
    if (id) {
      await fetchUpdate({ id, name }).then(() => {
        this.setState({
          name: '',
          editIndex: 0,
        }, this.getList)
      })
    } else {
      await fetchSave({ name }).then(() => {
        this.setState({
          name: '',
          isCreate: false,
        }, this.getList)
      })
    }
  }

  toggleAdd = () => {
    if (this.state.isCreate) {
      this.setState({ isCreate: !this.state.isCreate, name: '' })
    } else {
      this.setState({ isCreate: !this.state.isCreate })
    }
  }

  toggleEdit = (id, name) => {
    if (this.state.isCreate) {
      this.setState({ isCreate: false }, () => {
        this.setState({ name: name || '', editIndex: id || 0 })
      })
    } else {
      this.setState({ name: name || '', editIndex: id || 0 })
    }
  }

  triggerDialog = (id, name) => {
    const { openDialog, fetchDelete } = this.props
    openDialog({
      title: `Remove "${name}" from category?`,
      body: '',
      action: async () => {
        await fetchDelete({ id }).then(this.getList)
      }
    })
  }

  renderTableData = () => {
    const { classes, categories } = this.props;
    const { perPage, isCreate, name, editIndex } = this.state;

    let tableData = []
    let pagination
    if (isCreate) {
      tableData = [[
        '',
        <CustomInput
          id="name"
          name="name"
          inputProps={{
            autoFocus: true,
            value: name,
            onChange: this.onChange,
          }}
          formControlProps={{
            fullWidth: true,
            className: classes.formControl,
          }}
        />,
        '',
        <div>
          <IconButton
            aria-label="Save"
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
    if (categories.data) {
      let count = categories.from || 1
      tableData.push(..._.map(categories.data, row => {
        if (editIndex === row.id) {
          return [
            count++,
            <CustomInput
              id="name"
              name="name"
              inputProps={{
                autoFocus: true,
                value: name,
                onChange: this.onChange,
              }}
              formControlProps={{
                fullWidth: true,
                className: classes.formControl,
              }}
            />,
            Moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss'),
            (
              <div>
                <IconButton
                  aria-label="Save"
                  className={classes.tableActionButton}
                  onClick={() => { this.onSave(row.id) }}
                >
                  <Check
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="Close"
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
            count++,
            row.name,
            Moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss'),
            (
              <div>
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => this.toggleEdit(row.id, row.name)}
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
        }
      }))

      pagination = {
        page: categories.current_page || page,
        rowsPerPage: perPage,
        total: categories.total || categories.data.length,
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
              <h4 className={classes.cardTitleWhite}>Category</h4>
              <p className={classes.cardCategoryWhite}>
                Category of items
              </p>
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                onClick={this.toggleAdd}
              >
                {isCreate ? 'Cancel' : 'Add New'}
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={["No.", "Name", "Created Date", "Action"]}
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

export default Category;
