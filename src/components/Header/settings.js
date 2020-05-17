import React, { Component } from "react";
import { Button, Icon } from "native-base";
import { withNavigation } from "react-navigation";

class Settings extends Component {
  render() {
    return this.renderSettings();
  }

  renderSettings() {
    if (this.props.loginStatus) {
      return <Button transparent
        onPress={() => {
          this.props.navigation.navigate("Settings");
        }}
      >
        <Icon style={{ color: "#ffffff" }} name="ios-settings" />
      </Button>;
    }

    return null;
  }
}

export default withNavigation(Settings);
