import React, { Component } from "react";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Content, Button, Text, Form, Item, Label, Input, Toast, Spinner } from "native-base";

import * as firebase from "firebase";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeAWXcgUwIcc1HC_KSzJRHIeUsqgSgUYM",
  authDomain: "mnl-notifications.firebaseapp.com",
  databaseURL: "https://mnl-notifications.firebaseio.com",
  projectId: "mnl-notifications",
  storageBucket: "mnl-notifications.appspot.com",
  messagingSenderId: "189045273407"
};

firebase.initializeApp(firebaseConfig);

import styles from "./styles";

const launchscreenBg = require("../../../assets/splash-bg.png");
const launchscreenLogo = require("../../../assets/mnl-logo.png");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validating: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View style={styles.logoContainer}>
            <Content>
              <Form style={styles.formContainer}>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>User Email</Label>
                  <Input style={styles.input} onChangeText={(text) => this.setState({ email: text })} />
                </Item>
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>Password</Label>
                  <Input style={styles.input} secureTextEntry onChangeText={(text) => this.setState({ password: text })} />
                </Item>

                {this.renderSignInButton()}
              </Form>
            </Content>
          </View>
        </ImageBackground>
      </Container>
    );
  }

  validate() {
    // console.log("here");
    this.setState({ validating: true });

    let formData = new FormData();
    formData.append("type", "login");
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    return fetch("https://musicnl.ca/wp-json/app/v1/authentication", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.data;

        if (data.length === 0) {
          this.setState({ validating: false });
          Toast.show({
            text: "Invalid login",
            buttonText: "Okay",
            duration: 3000,
            type: "danger"
          });
        } else {
          // let fb_result = firebase.auth().fetchSignInMethodsForEmail(this.state.email);
          // console.log(fb_result);
          let self = this;

          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.handleLogin(data))
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === "auth/user-not-found") {
                firebase.auth()
                  .createUserWithEmailAndPassword(self.state.email, self.state.password)
                  .then(() => this.handleLogin(data))
                  .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/weak-password") {
                      alert("The password is too weak.");
                    } else {
                      alert(errorMessage);
                    }
                    console.log(error);
                  });
              }
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleLogin(data) {
    this.props.setUserID(data.user_id);
    this.props.toggleLoginStatus(true);

    this.setState({
      validating: false
    });

    this.props.navigation.navigate("Events", { page: 1 });

    return;
  }

  renderSignInButton() {
    if (this.state.validating) {
      return <Spinner color="#b6d666" />;
    }

    return <View>
      <Button
        block success
        style={styles.button}
        onPress={() => {
          if (this.state.email && this.state.password) {
            this.validate();
          } else {
            Toast.show({
              text: "Invalid input",
              buttonText: "Okay",
              duration: 3000,
              type: "danger"
            });
          }
        }}
      >
        <Text>SIGN IN</Text>
      </Button>
      <Button
        block transparent success
        onPress={() => {
          this.props.navigation.navigate("Events", { page: 1 });
        }}
      >
        <Text>Skip</Text>
      </Button>
    </View>;
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    userID: state.userID
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleLoginStatus: actions.toggleLoginStatus,
    setUserID: actions.setUserID
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
