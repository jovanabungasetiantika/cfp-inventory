import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import avatar from "../../assets/img/faces/marc.jpg";

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      email: '',
    }
    this.defaultState = this.state
    this.getUser()
  }

  doUpdate = async () => {
    const {
      id,
      name,
      email,
    } = this.state
    try {
      const { fetchUpdate } = this.props
      await fetchUpdate({
        id,
        name,
        email,
      })
    } catch (e) {
      console.log(e)
    }
  }

  getUser = async () => {
    const { fetchDetail } = this.props

    await fetchDetail().then(() => {
      const { user } = this.props
      if (user) {
        this.setState({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      }
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes, onLoading } = this.props;
    const { name, email } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Ubah Profil
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
                <p className={classes.cardCategoryWhite}>Lengkapi Profil</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Alamat E-mail"
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
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => { this.doUpdate() }}>Simpan</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default UserProfile
