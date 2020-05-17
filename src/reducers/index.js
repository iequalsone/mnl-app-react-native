let defaultState = {
  events: [],
  eventsByRegion: [],
  totalEvents: 0,
  totalEventsByRegion: 0,
  regions: [],
  region: "",
  loginStatus: false,
  enablePushNotifications: false,
  userID: -1,
  notifications: []
};

const mainReducer = (state = defaultState, action) => {
  if (action.type === "FETCH_EVENTS") {
    // console.log("here");
    return {
      ...state,
      events: [...state.events, ...action.events],
      loading: false,
      refreshing: false
    };
  } else if (action.type === "RESET_EVENTS") {
    return {
      ...state,
      events: action.events,
      loading: true,
      refreshing: false
    };
  } else if (action.type === "FETCH_EVENTS_BY_REGION") {
    // console.log("here");
    return {
      ...state,
      eventsByRegion: [...state.eventsByRegion, ...action.eventsByRegion],
      loading: false,
      refreshing: false
    };
  } else if (action.type === "RESET_EVENTS_BY_REGION") {
    return {
      ...state,
      eventsByRegion: action.eventsByRegion,
      loading: true,
      refreshing: false,
      region: ""
    };
  } else if (action.type === "FETCH_TOTAL_EVENTS") {
    return {
      ...state,
      totalEvents: action.totalEvents
    };
  } else if (action.type === "FETCH_TOTAL_EVENTS_BY_REGION") {
    return {
      ...state,
      totalEventsByRegion: action.totalEventsByRegion,
    };
  } else if (action.type === "TOGGLE_LOADING") {
    return {
      ...state,
      loading: action.loading
    };
  } else if (action.type === "TOGGLE_LOGIN_STATUS") {
    return {
      ...state,
      loginStatus: action.loginStatus
    };
  } else if (action.type === "TOGGLE_LOGIN_STATUS") {
    return {
      ...state,
      loginStatus: action.loginStatus
    };
  } else if (action.type === "TOGGLE_ENABLE_PUSH_NOTIFICATIONS") {
    return {
      ...state,
      enablePushNotifications: action.enablePushNotifications
    };
  } else if (action.type === "FETCH_ENABLE_PUSH_NOTIFICATIONS_STATUS") {
    return {
      ...state,
      enablePushNotifications: action.enablePushNotifications
    };
  } else if (action.type === "FETCH_REGIONS") {
    return {
      ...state,
      regions: action.regions
    };
  } else if (action.type === "SET_REGION") {
    return {
      ...state,
      region: action.region
    };
  } else if (action.type === "SET_USER_ID") {
    // console.log(action.userID);
    return {
      ...state,
      userID: action.userID
    };
  } else if (action.type === "FETCH_NOTIFICATIONS") {
    return {
      ...state,
      notifications: action.notifications
    };
  } else {
    return {
      ...state
    };
  }
};

export default mainReducer;
