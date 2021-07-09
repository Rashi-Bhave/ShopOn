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
import { Picker } from "@react-native-picker/picker";

export default class OrderedItemsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      ordersList: [],
      pickedValue: "all",
    };
    this.requestRef = null;
  }

  componentDidMount() {
    this.updateList("all");
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
          "Buyer Name: " + item.buyer_name + "\nOrder Status: " + item.order_status
        }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button} onPress={()=>{
            this.props.navigation.navigate("OrderDetails", {
              details: item,
            });
          }}>
            <Text>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  updateList = (value) => {
    this.setState({
      pickedValue: value,
      ordersList: [],
    });
    if (value === "all") {
      this.requestRef = db
        .collection("all_orders")
        .where("shop_id", "==", this.state.userId)
        .onSnapshot((snapshot) => {
          var orders = snapshot.docs.map((doc) => doc.data());
          this.setState({
            ordersList: orders,
          });
        });
    } else {
      this.requestRef = db
        .collection("all_orders")
        .where("shop_id", "==", this.state.userId)
        .where("order_status", "==", value)
        .onSnapshot((snapshot) => {
          var orders = snapshot.docs.map((doc) => doc.data());
          this.setState({
            ordersList: orders,
          });
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Ordered Items" navigation={this.props.navigation} />
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            backgroundColor: "#FFC801",
          }}
        >
          <Text style={{ fontSize: 20, alignSelf: "center", color: "#fff" }}>Filter: </Text>
          <Picker
            selectedValue={this.state.pickedValue}
            style={{ height: 40, width: 150, color: "#fff" }}
            onValueChange={(item, index) => {
              this.updateList(item);
            }}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="New Order" value="Item Ordered" />
            <Picker.Item label="Accepted Orders" value="Order Accepted" />
            <Picker.Item
              label="Orders Not Accepted"
              value="Order Not Accepted"
            />
            <Picker.Item label="Delivered Orders" value="Item Delivered" />
          </Picker>
        </View>
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
              <Text style={{ fontSize: 20 }}>No Ordered Items found</Text>
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
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
