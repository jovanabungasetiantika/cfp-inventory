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
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      successMessage: '',
    }
    this.defaultState = this.state
  }

  doRegister = async e => {
    e.preventDefault()
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
    } = this.state
    const { register } = this.props
    await register({
      name,
      username,
      email,
      password,
      confirmPassword,
    }).then(() => {
      this.setState({
        ...this.state,
        successMessage: 'Register success, you will be redirect to dashboard',
      })
    })
  }

  closeNotif = () => {
    const { history } = this.props
    this.setState({
      successMessage: '',
    }, () => { history.push('/') })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes, errorMessage, onLoading, fetchCleanFail } = this.props;
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
      successMessage,
    } = this.state
    let message = ''
    let open = false
    if (errorMessage) {
      open = true
      message = errorMessage
    } else if (successMessage) {
      open = true
      message = successMessage
    }
    return (
      <GridContainer alignItems="center" justify="center" classes={{ grid: classes.grid }}>
        <GridItem xs={10} sm={6} md={4} noPadding classes={{ grid: classes.container }}>
          <Card>
            <form onSubmit={this.doRegister}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Register form</h4>
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
                      labelText="Name"
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
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      name="username"
                      inputProps={{
                        value: username,
                        onChange: this.onChange,
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      name="email"
                      inputProps={{
                        value: email,
                        onChange: this.onChange,
                        type: 'email',
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
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      inputProps={{
                        value: confirmPassword,
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
                    <Button fullWidth color="primary" disabled={onLoading} type="submit" >Register</Button>
                  </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    - OR -
                </GridItem>
                  <GridItem noPadding xs={12} sm={12} md={12}>
                    <Button fullWidth color="info" disabled={onLoading} component={props => (<Link to="/login" {...props} />)}>Login</Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <Snackbar
          place="tc"
          color={errorMessage ? 'danger' : 'info'}
          icon={AddAlert}
          message={message}
          open={open}
          closeNotification={errorMessage ? fetchCleanFail : this.closeNotif}
          autoHideDuration={errorMessage ? null : 2000}
          close
        />
      </GridContainer>
    );
  }
}

export default Login;
