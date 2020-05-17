import * as Expo from "expo";
import React, { Component } from "react";
import { StyleProvider } from "native-base";
import axios from "axios";

import allReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const myMiddleWare = ({ getState }) => (next) => async (action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN_STATUS":
      let state = getState();
      // console.log(state.userID);
      let response = axios.get("https://musicnl.ca/wp-json/app/v1/notifiations-init/" + state.userID);
      break;
  }

  next(action);
};

const store = createStore(allReducers, applyMiddleware(thunk, myMiddleWare));

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
