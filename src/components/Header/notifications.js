import React, { Component } from "react";
import { Button, Badge, Text, Icon } from "native-base";
import { withNavigation } from "react-navigation";

class Notifications extends Component {
  render() {
    if (this.props.loginStatus && this.props.notifications) {
      let count = this.props.notifications.length;

      return <Button transparent
        onPress={() => {
          this.props.navigation.navigate("Notifications");
        }}
      >
        <Badge danger><Text>{count}</Text></Badge>
      </Button>;
    } else {
      <Button transparent
        onPress={() => {
          this.props.navigation.navigate("Notifications");
        }}
      >
        <Icon style={{ color: "#ffffff" }} name="ios-notifications" />
      </Button>;
    }

    return null;
  }
}

export default withNavigation(Notifications);
