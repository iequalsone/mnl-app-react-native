import React, { Component } from "react";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import registerForPushNotificationsAsync from "../../api/registerForPushNotificationsAsync";
import Expo, { Notifications } from "expo";
import * as firebase from "firebase";

import { Switch } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Left,
  Right,
  Text
} from "native-base";

import Header6 from "../Header/6";
import styles from "./styles";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notification: {},
      notificationsAvailable: [],
      error: "",
    };

    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
  }

  render() {
    // console.log(this._notificationSubscription);
    // alert(this.token);
    return (<Container style={styles.container}>
      <Header6 title="Settings!" showBackButton={true} />

      <Content padder>
        <Form>
          <Item style={styles.item}>
            <Left><Text>Enable Push Notifications</Text></Left>
            <Right>
              <Switch
                onValueChange={this.handleToggleSwitch}
                value={Boolean(this.props.enablePushNotifications)}
                onTintColor={"#5c5f6d"}
                tintColor={"#5c5f6d"}
              />
            </Right>
          </Item>
        </Form>
      </Content>
    </Container>);
  }

  componentDidMount() {
    this.props.fetchEnablePushNotificationsStatus(this.props.userID);
    this._notificationSubscription = this._registerForPushNotifications();
    // this._clearIconBadgeAsync();  
  }
  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  handleToggleSwitch(flag) {
    let formData = new FormData();
    formData.append("type", "enablePushNotifications");
    formData.append("userID", this.props.userID);

    if (flag) {
      formData.append("flag", 1);
    } else {
      formData.append("flag", 0);
    }

    return fetch("https://musicnl.ca/wp-json/app/v1/enable-push-notifications", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.props.toggleEnablePushNotifications(flag);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = (notification) => {
    this.userID = firebase.auth().currentUser.uid;
    this.props.navigation.navigate("Notifications");
    this.setState({ notification: notification });

    firebase.database().ref("users/" + this.userID + "/notifications").push(notification.data);
  };
}

function mapStateToProps(state) {
  return {
    userID: state.userID,
    enablePushNotifications: state.enablePushNotifications
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEnablePushNotificationsStatus: actions.fetchEnablePushNotificationsStatus,
    toggleEnablePushNotifications: actions.toggleEnablePushNotifications,
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Settings);
