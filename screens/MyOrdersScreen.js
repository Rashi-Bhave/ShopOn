import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class MyOrdersScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      ordersList: [],
    };
    this.requestRef = null;
  }

  getMyOrders = () => {
    this.requestRef = db
      .collection("all_orders")
      .where("buyer_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var orders = snapshot.docs.map((doc) => doc.data());
        this.setState({
          ordersList: orders,
        });
      });
  };

  componentDidMount() {
    this.getMyOrders();
  }

  componentWillUnmount() {
    this.requestRef;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    console.log(item.item_name);
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={
          "Order Status: " +
          item.order_status +
          "\nShop Name: " +
          item.shop_name
        }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Ordered Items" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.ordersList.length === 0 ? (
            <View style={styles.subContainer}>
              <Image
                source={require("../assets/Empty.png")}
                style={{
                  width: 400,
                  height: 400,
                }}
              />
              <Text style={{ fontSize: 20 }}>List Of All Ordered Items</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.ordersList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
