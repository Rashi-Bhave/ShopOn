import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";

import db from "../config.js";

export default class OrderDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: firebase.auth().currentUser.email,
      buyerName: this.props.navigation.getParam("details")["buyer_name"],
      buyerId: this.props.navigation.getParam("details")["buyer_id"],
      itemId: this.props.navigation.getParam("details")["item_id"],
      itemName: this.props.navigation.getParam("details")["item_name"],
      buyerAddress: this.props.navigation.getParam("details")["address"],
      orderStatus: this.props.navigation.getParam("details")["order_status"],
      shopName: this.props.navigation.getParam("details")["shop_name"],
      buyerContact: "",
      itemDescription: "",
      orderDocId: "",
      itemPrice: 0,
      orderRandomId: this.props.navigation.getParam("details")["order_id"],
    };
  }
  //   addNotification = () => {
  //     var msg =
  //       this.state.userName +
  //       " " +
  //       "has shown interest in exchanging item with you";
  //     db.collection("all_notifications").add({
  //       targeted_user_id: this.state.shopId,
  //       donor_id: this.state.userId,
  //       item_id: this.state.itemId,
  //       item_name: this.state.itemName,
  //       date: firebase.firestore.FieldValue.serverTimestamp(),
  //       notifications_status: "unread",
  //       message: msg,
  //     });
  //   };
  getDetails() {
    db.collection("customers")
      .where("email_id", "==", this.state.buyerId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            buyerContact: doc.data().contact,
          });
        });
      });

    db.collection("all_items")
      .where("item_id", "==", this.state.itemId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            itemDescription: doc.data().description,
            itemPrice: doc.data().price,
          });
        });
      });
    db.collection("all_orders")
      .where("order_id", "==", this.state.orderRandomId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ orderDocId: doc.id });
        });
      });
  }

  updateStatus = (status, docId) => {
    db.collection("all_orders").doc(docId).update({
      order_status: status,
    });
    if (status === "Item Delivered") {
      let stock, docId;
      db.collection("all_items")
        .where("item_id", "==", this.state.itemId)
        .where("item_name", "==", this.state.itemName)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            stock = doc.data().stock;
            docId = doc.id;
            db.collection("all_items")
              .doc(docId)
              .update({
                stock: stock - 1,
              });
          });
        })
        .then(() => {
          alert("Stock Subtracted from old one");
        });
    }
    if (status === "Order Accepted") {
      db.collection("all_notifications").add({
        notification: this.state.shopName + " " + "has accepted your order",
        targetted_user_id: this.state.buyerId,
        notification_status: "unread",
      });
    } else if (status === "Order Not Accepted") {
      db.collection("all_notifications").add({
        notification: this.state.shopName + " " + "did not accept your order",
        targetted_user_id: this.state.buyerId,
        notification_status: "unread",
      });
    } else if (status === "Item Delivered") {
      db.collection("all_notifications").add({
        notification:
          this.state.shopName +
          " " +
          "has delivered" +
          " " +
          this.state.itemName +
          " " +
          "to you",
        targetted_user_id: this.state.buyerId,
        notification_status: "unread",
      });
    }
  };

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#fff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Order Details",
              style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor="#ff9800"
          />
        </View>

        <View style={{ flex: 0.3, marginTop: 40 }}>
          <ScrollView>
            <Card title={"Item Information"} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Name : {this.state.itemName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Description : {this.state.description}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Price : ₹{this.state.itemPrice}
                </Text>
              </Card>
            </Card>
          </ScrollView>
        </View>

        <View style={{ flex: 0.3, marginTop: 15 }}>
          <ScrollView>
            <Card title={"Customer Information"} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Name: {this.state.buyerName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Contact: {this.state.buyerContact}
                </Text>
              </Card>
              <Card style={{ flex: 0.3 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Address: {this.state.buyerAddress}
                </Text>
              </Card>
            </Card>
          </ScrollView>
        </View>

        <View style={{ flex: 0.3, marginTop: 12 }}>
          <Card
            title={"Order Information"}
            titleStyle={{ fontSize: 20, marginTop: 30 }}
          >
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Order Status: {this.state.orderStatus}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.orderStatus === "Item Ordered" ? (
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => {
                  this.updateStatus("Order Accepted", this.state.orderDocId);
                  this.props.navigation.navigate("OrdersList");
                }}
              >
                <Text>Accept Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => {
                  this.updateStatus(
                    "Order Not Accepted",
                    this.state.orderDocId
                  );
                  this.props.navigation.navigate("OrdersList");
                }}
              >
                <Text>Don't Accept Order</Text>
              </TouchableOpacity>
            </View>
          ) : this.state.orderStatus === "Order Accepted" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateStatus("Item Delivered", this.state.orderDocId);
                this.props.navigation.navigate("OrdersList");
              }}
            >
              <Text>Item Delivered</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
