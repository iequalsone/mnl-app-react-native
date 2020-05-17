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
  detailsWrap: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  details: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  detailsTitle: {
    fontSize: 14,
    padding: 8,
    fontFamily: "Roboto_medium",
  },
  detailsDate: {
    fontSize: 12,
    padding: 8
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
  list: {
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 20
  },
  item: {
    flex: 1,
    margin: 5,
    width: deviceWidth / 2.1,
    height: deviceWidth / 2.1,
  },
  itemCover: {
    alignSelf: "stretch",
    height: deviceWidth / 2.1,
    width: null,
    position: "relative",
    marginBottom: 10

  },
  listNavWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listNav: {
    flex: 1,
    width: deviceWidth / 2.1,
  },
  listNavDisabled: {
    color: "#5c5f6d"
  },
  pickerHeader: {
    backgroundColor: "#28a8e0"
  },
  pickerHeaderTitle: {
    color: "#FFF"
  },
  pickerItem: {
    backgroundColor: "#FFFFFF",
    marginLeft: 0,
    paddingLeft: 10
  },
  pickerText: {
    color: "#000000"
  },
  pickerPlaceholder: {
    color: "#000"
  },
  picker: {
    width: deviceWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 0
  }
};
