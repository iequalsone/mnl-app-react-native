import _ from "lodash";
import React, { Component } from "react";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import updateNotificationsBadgeCount from "../../api/updateNotificationsBadgeCount";

import {
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";
import { withNavigation } from "react-navigation";

import Settings from "./settings";
import Notifications from "./notifications";

class Header6 extends Component {
  render() {
    return (
      <Header>
        <Left>
          {this.renderButton()}
        </Left>
        <Body>
          {this.renderTitle("Events")}
        </Body>
        <Right>
          <Notifications
            loginStatus={this.props.loginStatus}
            notifications={this.props.notifications} />
          <Settings loginStatus={this.props.loginStatus} />
        </Right>
      </Header>
    );
  }

  renderTitle(title) {
    if (this.props.title !== "") {
      return <Title>{this.props.title}</Title>;
    } else if (title !== "") {
      return <Title>{title}</Title>;
    }

    return;
  }

  renderButton() {
    if (this.props.showBackButton) {
      return <Button transparent onPress={() => this.props.navigation.navigate("Events")}>
        <Icon style={{ color: "#ffffff" }} name="ios-arrow-back" />
      </Button>;
    }

    return <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
      <Icon style={{ color: "#ffffff" }} name="ios-menu" />
    </Button>;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.notifications.length !== nextProps.notifications.length) {
  //     updateNotificationsBadgeCount(nextProps.notifications.length);
  //   }
  // }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus,
    notifications: state.notifications
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleLoginStatus: actions.toggleLoginStatus
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withNavigation(Header6));
