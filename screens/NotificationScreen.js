import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import SwipeableFlatlist from "../components/SwipeableFlatlist";
import db from "../config";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: [],
    };
    this.notificationRef;
  }

  componentDidMount() {
    this.notificationRef = db
      .collection("all_notifications")
      .where("notification_status", "==", "unread")
      .where("targetted_user_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          allNotifications: allNotifications,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.13 }}>
          <MyHeader
            title={"Notifications"}
            navigation={this.props.navigation}
          />
        </View>
        <View style={{ flex: 0.8 }}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.imageView}>
              <Image
                source={require("../assets/Empty.png")}
                style={{
                  width: 400,
                  height: 400,
                }}
              />
              <Text style={{ fontSize: 25 }}>You have no notifications</Text>
            </View>
          ) : (
            <SwipeableFlatlist allNotifications={this.state.allNotifications} />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
