import React, { Component } from "react";
import _ from 'lodash';
// core components
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "../../components/Autocomplete/Autocomplete.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";

class ItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      name: '',
      category: '',
      unit: '',
      price: '',
    }
    this.initLoad()
  }

  initLoad = async () => {
    const { fetchDetail, fetchCategoryIndex, id } = this.props
    try {
      await fetchCategoryIndex()
      if (id) {
        await fetchDetail({ id }).then(() => {
          const { item } = this.props
          if (item) {
            this.setState({
              name: item.name,
              category: {
                value: `${item.category.id}`,
                label: item.category.name,
              },
              unit: item.unit,
              price: item.price,
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
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fetchSave, fetchUpdate, history, id } = this.props
    const {
      name,
      category,
      unit,
      price,
    } = this.state
    if (!id) {
      fetchSave({
        name,
        category_id: category.value,
        unit,
        price,
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/item')
        }
      })
    } else {
      fetchUpdate({
        id,
        name,
        category_id: category.value,
        unit,
        price,
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/item')
        }
      })
    }

  }

  render() {
    const { classes, history, categories, onLoading } = this.props;
    const { name, category, unit, price } = this.state;

    const categoryList = categories && categories.length > 0 ? _.map(categories, i => ({ value: i.id, label: i.name })) : []

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={this.handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Input Produk
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
                <p className={classes.cardCategoryWhite}>Lengkapi Detail Produk</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nama"
                      id="name"
                      name="name"
                      inputProps={{
                        autoFocus: true,
                        value: name,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                      labelText="Kategori"
                      id="category"
                      name="category"
                      suggestions={categoryList}
                      inputProps={{
                        value: category,
                        onChange: this.onAutocompleteChange('category'),
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                      placeholder="Pilih Kategori..."
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Satuan"
                      id="unit"
                      name="unit"
                      inputProps={{
                        value: unit,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Harga"
                      id="price"
                      name="price"
                      inputProps={{
                        value: price,
                        onChange: this.onChange,
                        type: 'number',
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={() => { history.goBack() }}>Batal</Button>
                <Button color="primary" type="submit">Simpan</Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    );
  }
}

export default ItemForm;
