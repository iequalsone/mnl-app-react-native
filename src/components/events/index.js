import React, { Component } from "react";
import * as actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import geolib from "geolib";

import {
  Container,
  Spinner,
  View,
  Toast
} from "native-base";

import EventsList from "./eventsList";
import Pagination from "./pagination";
import Header6 from "../Header/6";
import styles from "./styles";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      error: null,
    };

    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleGeoUpdate = this.handleGeoUpdate.bind(this);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header6 title="Events" />
        {this.renderRows()}
      </Container>
    );
  }

  renderRows() {
    if (this.props.loading) {
      return <Spinner color="#28a8e0" />;
    } else {
      return <View>
        {/* {this.renderPagination(this.props.totalEvents, 8)} */}
        {/* <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null} */}
        <EventsList
          eventsList={this.props.events}
          handleOnPress={this.handleOnPress}
          loading={this.props.loading}
          handleRefresh={this.handleRefresh}
          handleLoadMore={this.handleLoadMore}
          regions={this.props.regions}
          region={this.props.region}
          handleRegionChange={this.handleRegionChange}
          handleGeoUpdate={this.handleGeoUpdate}
        />
      </View>;
    }
  }

  renderPagination(totalEvents, itemsPerPage) {
    const totalPages = (totalEvents / itemsPerPage).toFixed(0);
    const currentPage = this.props.navigation.getParam("page", 1);
    let nextPage, prevPage;

    if (currentPage >= totalPages) {
      return;
    }

    if (currentPage <= totalPages) {
      nextPage = currentPage; nextPage++;
    }

    if (currentPage !== 1 && currentPage <= totalPages) {
      prevPage = currentPage; prevPage--;
    }

    return <Pagination
      nextPage={nextPage}
      prevPage={prevPage}
      onNextPress={this.onNextPress}
      onPrevPress={this.onPrevPress}
    />;
  }

  handleOnPress(slug) {
    this.props.navigation.navigate("EventDetails", {
      slug
    });
  }

  handleRefresh() {
    this.props.toggleLoading(true);
    this.setState({
      page: 1
    }, () => {
      this.props.resetEvents();
      this.props.fetchEvents(this.state.page);
    });
  }

  handleLoadMore() {
    // console.log("here");
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.props.fetchEvents(this.state.page);
    });
  }

  handleRegionChange(region) {
    this.props.navigation.navigate("EventsByRegion", {
      region
    });
  }

  handleGeoUpdate(lat, lng) {
    // console.log(lat);
    // console.log(lng);

    if (this.props.regions) {
      this.props.regions.map((region) => {
        let distance = geolib.getDistance(
          // { latitude: 47.56265129625375, longitude: -52.709770522325 },
          { latitude: lat, longitude: lng },
          { latitude: region.lat, longitude: region.lng }
        );

        // console.log(typeof region.lat);
        // console.log(typeof region.lng);

        if (geolib.convertUnit("mi", distance, 0) <= 100) {
          this.props.navigation.navigate("EventsByRegion", {
            region: region.slug
          });
        } else {
          Toast.show({
            text: "Not available at this time.",
            buttonText: "Okay",
            duration: 3000,
            type: "danger"
          });
        }
      });
    }

    return;
  }

  componentWillMount() {
    this.props.fetchTotalEvents();
    this.props.fetchRegions();
  }

  componentDidMount() {
    this.props.resetEvents();
    this.props.fetchEvents(1); // sending Page 1 param

    if (this.props.loginStatus) {
      this.props.fetchNotifications(this.props.userID);
    }
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    totalEvents: state.totalEvents,
    loading: state.loading,
    regions: state.regions,
    notifications: state.notifications,
    userID: state.userID,
    loginStatus: state.loginStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEvents: actions.fetchEvents,
    resetEvents: actions.resetEvents,
    fetchTotalEvents: actions.fetchTotalEvents,
    toggleLoading: actions.toggleLoading,
    fetchRegions: actions.fetchRegions,
    fetchNotifications: actions.fetchNotifications
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Events);
