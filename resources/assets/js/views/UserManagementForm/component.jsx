import React, { Component } from "react";
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress'
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

class UserManagementForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      name: '',
      email: '',
      username: '',
    }
    this.initLoad()
  }

  initLoad = async () => {
    const { fetchDetail, id } = this.props
    if (id) {
      await fetchDetail({ id }).then(() => {
        const { user } = this.props
        if (user) {
          this.setState({
            username: user.username, 
            name: user.name,
            email: user.email,
          })
        }
      })
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
      username,
      email,
    } = this.state
    if (!id) {
      fetchSave({
        name,
        username,
        email,
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/user')
        }
      })
    } else {
      fetchUpdate({
        name,
        username,
        email,
      }).then(() => {
        if (!this.props.isError) {
          history.replace('/user')
        }
      })
    }

  }

  render() {
    const { classes, history, onLoading } = this.props;
    const { name, username, email } = this.state;

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
                      labelText="Username"
                      id="username"
                      name="username"
                      inputProps={{
                        autoFocus: true,
                        value: username,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nama"
                      id="name"
                      name="name"
                      inputProps={{
                        value: name,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      name="email"
                      inputProps={{
                        value: email,
                        onChange: this.onChange,
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

export default UserManagementForm;
