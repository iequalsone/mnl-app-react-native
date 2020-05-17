import axios from "axios";

export function fetchEvents(page) {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/app/v2/events/" + page).then(result => {
      dispatch(setEvents(result.data));
      // console.log(result.data);
      // console.log("here");
    });
  };
}
export function setEvents(events) {
  return {
    type: "FETCH_EVENTS",
    events
  };
}
export function resetEvents() {
  return {
    type: "RESET_EVENTS",
    events: []
  };
}

export function fetchEventsByRegion(region, page) {
  // console.log("action: " + region + ", page: " + page);
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/app/v2/events-by-region/" + region + "/" + page).then(result => {
      dispatch(setEventsByRegion(result.data));
      // console.log(result.data);
      // console.log("here");
    });
  };
}
export function setEventsByRegion(eventsByRegion) {
  return {
    type: "FETCH_EVENTS_BY_REGION",
    eventsByRegion
  };
}
export function resetEventsByRegion() {
  return {
    type: "RESET_EVENTS_BY_REGION",
    eventsByRegion: []
  };
}

export function fetchTotalEvents() {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/dc/v2/events-total").then(result => {
      dispatch(setTotalEvents(result.data));
    });
  };
}
export function setTotalEvents(totalEvents) {
  return {
    type: "FETCH_TOTAL_EVENTS",
    totalEvents
  };
}

export function fetchTotalEventsByRegion(region) {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/app/v2/events-total-by-region/" + region).then(result => {
      dispatch(setTotalEventsByRegion(result.data));
    });
  };
}
export function setTotalEventsByRegion(totalEventsByRegion) {
  return {
    type: "FETCH_TOTAL_EVENTS_BY_REGION",
    totalEventsByRegion
  };
}

export function fetchRegions() {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/dc/v1/regions-all").then(result => {
      dispatch(setRegions(result.data));
      // console.log(result.data);
    });
  };
}
export function setRegions(regions) {
  return {
    type: "FETCH_REGIONS",
    regions
  };
}

export function fetchNotifications(userid) {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/app/v1/get-notifications/" + userid).then(result => {
      dispatch(setNotifications(result.data));
      // console.log(result.data);
      // console.log("here");
    });
  };
}
export function setNotifications(notifications) {
  return {
    type: "FETCH_NOTIFICATIONS",
    notifications
  };
}

export function setRegion(region) {
  return {
    type: "SET_REGION",
    region
  };
}

export function setUserID(userID) {
  return {
    type: "SET_USER_ID",
    userID
  };
}

export function toggleLoading(flag) {
  return {
    type: "TOGGLE_LOADING",
    loading: flag
  };
}

export function toggleLoginStatus(flag) {
  return {
    type: "TOGGLE_LOGIN_STATUS",
    loginStatus: flag
  };
}

export function fetchEnablePushNotificationsStatus(userid) {
  return (dispatch) => {
    return axios.get("https://musicnl.ca/wp-json/app/v1/get-enable-push-notifications-status/" + userid).then(result => {
      dispatch(setEnablePushNotificationsStatus(result.data));
      // console.log(result.data);
      // console.log("here");
    });
  };
}

export function setEnablePushNotificationsStatus(enablePushNotifications) {
  return {
    type: "FETCH_ENABLE_PUSH_NOTIFICATIONS_STATUS",
    enablePushNotifications
  };
}

// export function setEnablePushNotifications(userID, flag) {
//   return (dispatch) => {
//     // return axios.get("https://musicnl.ca/wp-json/app/v1/get-notifications/" + userid).then(result => {
//     //   dispatch(setNotifications(result.data));
//     //   // console.log(result.data);
//     //   // console.log("here");
//     // });

//     // console.log(userID);
//     // console.log(flag);

//     let formData = new FormData();
//     formData.append("type", "enablePushNotifications");
//     formData.append("userID", userID);
//     formData.append("flag", flag);

//     return fetch("https://musicnl.ca/wp-json/app/v1/enable-push-notifications", {
//       method: "POST",
//       body: formData
//     })
//       .then(response => {
//         dispatch(toggleEnablePushNotifications(response));
//         // console.log(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }
export function toggleEnablePushNotifications(flag) {
  // console.log(flag);

  return {
    type: "TOGGLE_ENABLE_PUSH_NOTIFICATIONS",
    enablePushNotifications: flag
  };
}
