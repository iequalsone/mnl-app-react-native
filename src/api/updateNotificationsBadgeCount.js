import { Permissions, Notifications } from "expo";
import * as firebase from "firebase";

export default (async function updateNotificationsBadgeCount(count) {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  // let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // // Stop here if the user did not grant permissions
  // if (status !== "granted") {
  //   return;
  // }
  // Get the token that uniquely identifies this device
  // let count = await Notifications.setBadgeNumberAsync(number);

  // // alert(token);

  // let userID = firebase.auth().currentUser.uid;
  // let userEmail = firebase.auth().currentUser.email;

  // firebase.database().ref("/users/" + userID).update({ token: token });

  // // // POST the token to our backend so we can use it to send pushes from there
  // return fetch("https://musicnl.ca/wp-json/app/v1/save-expo-push-token", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     userEmail
  //   }),
  // });

  let result = Notifications.setBadgeNumberAsync(count);
  // console.log(result);

  return result;
});
