import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Body,
  Right,
  Button
} from "native-base";
import { withNavigation } from "react-navigation";

import Header6 from "../Header/6";
import styles from "./styles";

class Notifications extends Component {
  render() {
    // console.log(this.props.notifications);
    return (<Container style={styles.container}>
      <Header6 title="Notifications" showBackButton={true} />

      <Content padder>
        {this.renderNotificationList()}
      </Content>
    </Container>);
  }

  renderNotificationList() {
    let listItems = this.props.notifications.map(val => {
      const { title, excerpt, slug, id, event_date, location } = val;

      // return <ListItem key={slug} onPress={() => this.ArchiveNotification(id, slug)}>
      return <ListItem key={slug} onPress={() => this.ArchiveNotification(id, slug)}>
        {/* <Left>
          <Thumbnail square source={{ uri: 'Image URL' }} />
        </Left> */}
        <Body>
          <Text>{title}</Text>
          <Text>{event_date}</Text>
        </Body>
      </ListItem>;
    });
    return <List>{listItems}</List>;
  }

  ArchiveNotification = (nid, slug) => {
    // console.log(nid);
    fetch("https://musicnl.ca/wp-json/app/v1/archive-notification/" + nid).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server updating records.
        // console.log(responseJson);
        if (responseJson) {
          this.props.fetchNotifications(this.props.userID);
          this.props.navigation.navigate("EventDetails", {
            slug
          });
        }
      }).catch((error) => {
        console.error(error);
      });

    return;
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    userID: state.userID,
    notifications: state.notifications
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleLoginStatus: actions.toggleLoginStatus,
    fetchNotifications: actions.fetchNotifications
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withNavigation(Notifications));
