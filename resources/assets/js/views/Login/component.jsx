import React, { Component } from "react";
import { Link } from 'react-router-dom';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
// import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  doLogin = async (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { login, history, cookies } = this.props
    await login({ username, password })
      .then(() => {
        history.push('/')
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes, errorMessage, onLoading, fetchCleanFail } = this.props;
    const { username, password } = this.state
    return (
      <GridContainer alignItems="center" justify="center" classes={{ grid: classes.grid }}>
        <GridItem xs={10} sm={6} md={4} noPadding classes={{ grid: classes.container }}>
          <Card>
            <form onSubmit={this.doLogin}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Login Aplikasi Monitoring Stock</h4>
              </CardHeader>
              <CardBody>
                {/* <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer> */}
                <GridContainer noMargin>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Username/E-mail"
                      id="username"
                      name="username"
                      inputProps={{
                        value: username,
                        onChange: this.onChange,
                        autoFocus: true,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      name="password"
                      type="password"
                      inputProps={{
                        value: password,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                {/* <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              </CardBody>
              <CardFooter>
                <GridContainer noMargin direction="column" alignItems="center">
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <Button fullWidth color="primary" disabled={onLoading} type="submit">Login</Button>
                  </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    - OR -
                </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <Button fullWidth color="info" disabled={onLoading} component={props => (<Link to="/register" {...props} />)}>Register</Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <Snackbar
          place="tc"
          color="danger"
          icon={AddAlert}
          message={errorMessage || ''}
          open={errorMessage || false}
          closeNotification={fetchCleanFail}
          close
        />
      </GridContainer>
    );
  }
}

export default Login;
