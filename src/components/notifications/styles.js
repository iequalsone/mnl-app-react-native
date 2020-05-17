const React = require("react-native");
const { Platform, Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#000"
  },
  screenCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  ticketsText: {
    color: "#ffffff",
    fontSize: 16
  },
  eventsCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  logo: {
    position: "absolute",
    // left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    left: deviceWidth / 10,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 241,
    height: 72,
    resizeMode: "cover"
  },
  date: {
    color: "#28A8E0",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Roboto_medium",
    fontSize: 28,
    marginBottom: 5,
  },
  location: {
    color: "#8E8F92",
    marginBottom: 20,
  },
  h4: {
    color: "#ffffff",
  },
  content: {
    color: "#8E8F92",
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0
  },
  viewWithBorder: {
    borderTopColor: "#9B9C9F",
    borderTopWidth: 1,
    paddingTop: 15,
    marginBottom: 15,
  },
  subHeader: {
    color: "#9B9C9F",
    marginBottom: 10,
    fontFamily: "Roboto_medium",
  },
  viewText: {
    color: "#9B9C9F",
  },
  externalLink: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  viewContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
}
