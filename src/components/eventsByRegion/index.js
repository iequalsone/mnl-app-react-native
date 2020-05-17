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

class EventsByRegion extends Component {
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
    // console.log(this.props.region);
    return (
      <Container style={styles.container}>
        <Header6 title="Events By Region" />
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
        <EventsList
          eventsList={this.props.eventsByRegion}
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
    this.props.navigation.navigate("Events");
  }

  handleLoadMore() {
    // console.log(this.props.region);

    const totalPages = (this.props.totalEventsByRegion / 20).toFixed(0);

    if (totalPages > this.state.page) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.fetchEventsByRegion(this.props.navigation.getParam("region"), this.state.page);
      });
    }
  }

  handleRegionChange(region) {
    this.props.navigation.navigate("EventsByRegion", {
      region
    });

    this.props.resetEventsByRegion();
    this.props.setRegion(region);
    this.props.fetchEventsByRegion(region, 1);
  }

  handleGeoUpdate(lat, lng) {
    if (this.props.regions) {
      this.props.regions.map((region) => {
        let distance = geolib.getDistance(
          // { latitude: 47.571886, longitude: 52.702839 },
          { latitude: lat, longitude: lng },
          { latitude: region.lat, longitude: region.lng }
        );

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

  componentDidMount() {
    const region = this.props.navigation.getParam("region");

    this.props.resetEventsByRegion();
    this.props.setRegion(region);
    this.props.fetchEventsByRegion(region, 1);
    this.props.fetchTotalEventsByRegion(region);
    this.props.fetchRegions();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.region !== nextProps.region) {
  //     if (nextProps.region !== "") {
  //       this.props.resetEvents();
  //       this.props.fetchEventsByRegion(nextProps.region, this.state.page);
  //     }
  //   }
  // } 
}

function mapStateToProps(state) {
  return {
    eventsByRegion: state.eventsByRegion,
    totalEventsByRegion: state.totalEventsByRegion,
    loading: state.loading,
    regions: state.regions,
    region: state.region
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    resetEventsByRegion: actions.resetEventsByRegion,
    fetchEventsByRegion: actions.fetchEventsByRegion,
    fetchTotalEventsByRegion: actions.fetchTotalEventsByRegion,
    toggleLoading: actions.toggleLoading,
    fetchRegions: actions.fetchRegions,
    setRegion: actions.setRegion
  },
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EventsByRegion);
