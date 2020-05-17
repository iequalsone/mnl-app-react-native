import React, { Component } from "react";
import * as actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as firebase from "firebase";

class Signout extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    let formData = new FormData();
    formData.append("type", "saveLogoutDateTime");
    formData.append("userID", this.props.userID);

    return fetch("https://musicnl.ca/wp-json/app/v1/save-logout-datetime", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        firebase.auth().signOut().then(() => {
          // this.props.setUserID(-1);
          this.props.toggleLoginStatus(false);
          this.props.navigation.navigate("Home");
        }).catch(error => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    if (this.props.loginStatus) {
      this.logout();
    } else {
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return null;
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

export default connect(mapStateToProps, matchDispatchToProps)(Signout);
