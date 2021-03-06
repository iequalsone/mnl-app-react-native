import React, { Component } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import dateFormat from "dateformat";

import {
  Header,
  Left,
  Right,
  Button,
  Body,
  Title,
  Text,
  View,
  Spinner,
  Icon,
  Item,
  Picker
} from "native-base";

import styles from "./styles";

const eventsCover = require("../../../assets/event-list-header.png");
const logo = require("../../../assets/mnl-logo.png");

class EventsList extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      selected2: undefined,
      latitude: "",
      longitude: "",
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleLoadMoreByRegion = this.handleLoadMoreByRegion.bind(this);
  }

  render() {
    // console.log(this.props.eventsList);
    return this.renderOutput();
  }

  renderOutput() {
    let data = this.props.eventsList.map(val => {
      const { id, title, slug, start_datetime, image, member_profile_image } = val;

      let uri;

      if (image) {
        uri = image[0];
      } else if (!member_profile_image) {
        uri = "http://via.placeholder.com/170x170";
      } else {
        uri = member_profile_image;
      }

      return {
        id,
        key: slug,
        title,
        slug,
        start_datetime,
        uri
      };
    });

    let loading;

    if (!this.props.loading) {
      loading = <Spinner color="#28a8e0" />;
    } else {
      loading = "";
    }

    let output = <View>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={2}
        data={data}
        renderItem={item => this.renderItem(item)}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      {loading}
    </View>;

    return output;
  }

  renderHeader = () => {
    // console.log(this.props.region);
    let regions = this.props.regions.map(val => {
      return <Picker.Item key={val.slug} label={val.name} value={val.slug} />;
    });

    regions.unshift(<Picker.Item key="" label="Search by Region" value="" />);
    regions.push(<Picker.Item key="use-device-gps" label="Use Device's location" value="use-device-gps" />);

    return <View>
      <Image source={eventsCover} style={styles.eventsCover} />
      <Image square style={styles.logo} source={logo} />
      <Item picker>
        <Picker
          renderHeader={backAction => this.renderPickerHeader(backAction)}
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={styles.picker}
          textStyle={styles.pickerText}
          itemStyle={styles.pickerItem}
          itemTextStyle={styles.pickerText}
          placeholder="Choose your Region"
          placeholderStyle={styles.pickerPlaceholder}
          placeholderIconColor="#fff"
          selectedValue={this.props.region}
          onValueChange={this.onValueChange2.bind(this)}
        >
          {regions}
        </Picker>
      </Item>
    </View>;
  }

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 70,
          borderTopWidth: 1,
          borderColor: "#b6d666"
        }}
      />
    );
  };

  renderPickerHeader(backAction) {
    return <Header style={styles.pickerHeader}>
      <Left>
        <Button transparent onPress={backAction}>
          <Icon name="ios-arrow-back" style={{ color: "#fff" }} />
        </Button>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={styles.pickerHeaderTitle}>Regions</Title>
      </Body>
      <Right />
    </Header>;
  }

  renderItem({ item, index }) {
    const { title, slug, start_datetime, uri } = item;

    var dt = new Date(start_datetime);
    // console.log(formattedDate);


    return <View style={styles.item}>
      <Image source={{ uri }} style={styles.itemCover} />
      <View style={styles.detailsWrap}>
        <TouchableOpacity style={styles.details} onPress={() => this.onPressEvent(slug)}>
          <Text style={styles.detailsTitle}>{title}</Text>
          <Text style={styles.detailsDate}>{dateFormat(dt, "mmm dd, yyyy, h:MM")}</Text>
          {/* <Text style={styles.detailsDate}>{start_datetime}</Text> */}
        </TouchableOpacity>
      </View>
    </View>;
  }

  handleRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      this.props.handleRefresh();
    });
  }

  handleLoadMore() {
    this.props.handleLoadMore();
  }

  handleLoadMoreByRegion() {
    this.props.handleLoadMoreByRegion();
  }

  onPressEvent(slug) {
    this.props.handleOnPress(slug);
  }

  onValueChange2(value) {
    if (value === "use-device-gps") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }, () => {
            this.props.handleGeoUpdate(position.coords.latitude, position.coords.longitude);
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
      this.props.handleRegionChange(value);
    }
  }
}

export default EventsList;
