import React, { Component } from "react";
import axios from "axios";
import { Permissions, Calendar } from "expo";
import { Image, View, ScrollView, Dimensions, Linking, Platform, Alert } from "react-native";
import HTML from "react-native-render-html";
import dateFormat from "dateformat";

import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Spinner
} from "native-base";

import Header6 from "../Header/6";
import styles from "./styles";

const eventsCover = require("../../../assets/event-list-header.png");
const logo = require("../../../assets/mnl-logo.png");

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      nextEvent: "",
      loading: true,
      results: [],
      calSynced: false
    };

    // this.calEventHandler = this.calEventHandler.bind(this);
  }

  render() {
    // console.log(this.state.event);
    return (<Container style={styles.container}>
      <Header6 title="Event Details" showBackButton={true} />

      <Content padder>
        {this.renderImage()}
        {this.renderOutput()}
      </Content>
    </Container>);
  }

  renderOutput() {
    if (this.state.loading) {
      return <Spinner color="#28a8e0" />;
    } else {
      return <View style={styles.viewContainer}>
        <Text style={styles.date}>{dateFormat(this.state.event.start_datetime, "mmm dd, yyyy")}</Text>
        <Text style={styles.title}>{this.state.event.title}</Text>
        {this.renderCalendarButton()}
        <Text style={styles.location}>{this.state.event.location}</Text>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.h4}>DESCRIPTION</Text>
          <HTML baseFontStyle={styles.content} html={this.state.event.content} imagesMaxWidth={Dimensions.get("window").width} />
        </ScrollView>

        {this.renderDateTime()}
        {this.renderLocation()}
        {this.renderTicketsCost()}
        {this.renderWebsite()}
      </View>;
    }
  }

  renderCalendarButton() {
    if (this.state.calSynced) {
      return <Button disabled>
        <Icon name="add-circle" />
        <Text>Add to Calendar</Text>
      </Button>;
    }

    return <Button onPress={this.synchronizeCalendar} style={styles.calButton}>
      <Icon name="add-circle" />
      <Text>Add to Calendar</Text>
    </Button>;
  }

  renderWebsite() {
    if (this.state.event.website) {
      return <View style={styles.viewWithBorder}>
        <Text style={styles.subHeader}>WEBSITE</Text>
        <Button transparent onPress={() => Linking.openURL(this.state.event.website)}><Text style={styles.externalLink}>Click to open in browser</Text></Button>
      </View>;
    }

    return;
  }

  renderTicketsCost() {
    if (this.state.event.tickets_cost) {
      return <View style={styles.viewWithBorder}>
        <Text style={styles.subHeader}>TICKETS / COST</Text>
        <ScrollView style={{ flex: 1 }}>
          <HTML baseFontStyle={styles.content} html={this.state.event.tickets_cost} imagesMaxWidth={Dimensions.get("window").width} />
        </ScrollView>
      </View>;
    }

    return;
  }

  renderLocation() {
    if (this.state.event.location) {
      return <View style={styles.viewWithBorder}>
        <Text style={styles.subHeader}>LOCATION</Text>
        <Text style={styles.viewText}>{this.state.event.location}</Text>
      </View>;
    }

    return;
  }

  renderDateTime() {
    if (this.state.event.start_date && this.state.event.end_date) {
      return <View style={styles.viewWithBorder}>
        <Text style={styles.subHeader}>DATE / TIME</Text>
        <Text style={styles.viewText}>Start Date: {dateFormat(this.state.event.start_date, "ddd, mmm dd, yyyy")}</Text>
      </View>;
    } else if (this.state.event.start_date) {
      return <View style={styles.viewWithBorder}>
        <Text style={styles.subHeader}>DATE / TIME</Text>
        <Text style={styles.viewText}>Start Date: {dateFormat(this.state.event.start_date, "ddd, mmm dd, yyyy")}</Text>
        <Text style={styles.viewText}>End Date: {dateFormat(this.state.event.end_date, "ddd, mmm dd, yyyy")}</Text>
      </View>;
    }

    return;
  }

  renderImage() {
    if (this.state.event.image) {
      return <Image source={{ uri: this.state.event.image[0] }} style={styles.screenCover} />;
    }

    return <View>
      <Image source={eventsCover} style={styles.eventsCover} />
      <Image square style={styles.logo} source={logo} />
    </View>;
  }

  fetchEvent(slug) {
    var self = this;
    // console.log(self);
    this.serverRequest = axios
      .get("https://musicnl.ca/wp-json/app/v2/event/" + slug)
      .then(function (result) {
        // console.log(result.data[0]);
        if (typeof result.data[0] !== "undefined") {
          const {
            id,
            title,
            content,
            content_orig,
            start_datetime,
            end_datetime,
            location,
            tags,
            category,
            tickets_cost,
            time,
            sub_title,
            website,
            image,
          } = result.data[0];
          self.setState({
            event: {
              id,
              title,
              content,
              content_orig,
              slug,
              start_datetime,
              end_datetime,
              location,
              tags,
              category,
              tickets_cost,
              time,
              sub_title,
              website,
              image,
            },
            loading: false,
          });

          // console.log(self.state);
        }
      }) // Catch any error here
      .catch(error => {
        console.log(error);
      });
  }

  _askForCalendarPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.CALENDAR);
    return response.status === "granted";
  }

  _askForReminderPermissions = async () => {
    if (Platform.OS === "android") {
      return true;
    }

    const response = await Permissions.askAsync(Permissions.REMINDERS);
    return response.status === "granted";
  }

  _findCalendars = async () => {
    const calendarGranted = await this._askForCalendarPermissions();
    const reminderGranted = await this._askForReminderPermissions();
    let calendars = [];

    if (calendarGranted && reminderGranted) {
      calendars = await Calendar.getCalendarsAsync();
    }

    return calendars;
  }

  _createNewCalendar = async (calendars) => {
    console.log(calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name);
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default').source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
            name: calendars.find(cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER).source.name,
            isLocalAccount: true
          }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(cal => cal.accessLevel == Calendar.CalendarAccessLevel.OWNER).ownerAccount
          : undefined
    }

    let calendarId = null

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar)
    } catch (e) {
      Alert.alert("The calendar has not been saved", e.message)
    }

    return calendarId
  }

  _addEventsToCalendar = async (calendarId) => {
    // console.log(this.state.event);

    const calendarGranted = await this._askForCalendarPermissions();
    const reminderGranted = await this._askForReminderPermissions();

    if (calendarGranted && reminderGranted) {
      var { title, time, location, start_datetime, end_datetime } = this.state.event;

      var startDate = new Date(start_datetime);
      var endDate = new Date(end_datetime);

      const event = {
        title,
        location,
        startDate,
        endDate,
        timeZone: "America/St_Johns"
      };

      var result = false;

      try {
        // await Calendar.createEventAsync(calendarId, event)
        if (calendarId !== null) {
          result = await Calendar.createEventAsync(calendarId, event);
        } else {
          result = await Calendar.createEventAsync(Calendar.DEFAULT, event);
        }
      } catch (e) {
        Alert.alert("An error occured when adding the event to your calendar");
      }

      return result;
    }
  }

  synchronizeCalendar = async () => {
    let calendarId = null;

    if (Platform.OS === 'ios') {
      let calendars = await this._findCalendars();
      let calendarId = calendars.find(cal => cal.source && cal.source.name === "iCloud").id;

      // let calendarId = calendars.find(cal => {
      //   Alert.alert(cal.source.name);
      // });
      // console.log(calendarId);
    }

    // console.log(calendarId);
    // const calendarId = await this._createNewCalendar(calendars)

    try {
      await this._addEventsToCalendar(calendarId).then(result => {
        if (result) {
          // console.log(result);
          // Alert.alert(result);
          this.setState({
            calSynced: true
          });
          Alert.alert("The calendar has been synchronized");
        } else {
          Alert.alert("There was a problem synchronizing");
        }
      });
    } catch (e) {
      Alert.alert("An error occurred while adding calendar events", e.message);
    }
  }



  componentDidMount() {
    const slug = this.props.navigation.getParam("slug", "NO-SLUG");
    // console.log(slug);
    this.fetchEvent(slug);
  }
}

export default Events;
