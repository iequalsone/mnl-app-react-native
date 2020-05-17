const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 15,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    // position: "absolute",
    // left: Platform.OS === "android" ? 40 : 30,
    // left: 30,
    // top: Platform.OS === "android" ? 35 : 60,
    // top: 60,
    width: 277,
    height: 83
  },
  formContainer: {
    width: deviceWidth
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  label: {
    color: "#ffffff",
  },
  input: {
    color: "#ffffff",
  },
  item: {
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  }
};
