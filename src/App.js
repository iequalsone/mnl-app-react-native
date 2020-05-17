import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import Events from "./components/events/";
import EventsByRegion from "./components/eventsByRegion/";
import EventDetails from "./components/eventdetails/";
import Settings from "./components/settings";
import Notifications from "./components/notifications";
import Signout from "./components/signout";
import SideBar from "./components/sidebar/";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    // Home: { screen: Settings },
    Events: { screen: Events },
    EventsByRegion: { screen: EventsByRegion },
    EventDetails: { screen: EventDetails },
    Settings: { screen: Settings },
    Notifications: { screen: Notifications },
    Signout: { screen: Signout },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    drawerBackgroundColor: "black",
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
