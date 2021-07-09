import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { Image } from "react-native";

export default class MyStockScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allItems: [],
      stock: 0,
      query: "",
      originalItems: [],
    };
    this.itemRef = null;
  }

  updateStock = (stock, docId) => {
    db.collection("all_items").doc(docId).update({
      stock: stock,
    });
  };

  getAllItems = () => {
    this.itemRef = db
      .collection("all_items")
      .where("user_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allItems = [];
        snapshot.docs.map((doc) => {
          var items = doc.data();
          items["doc_id"] = doc.id;
          allItems.push(items);
        });
        this.setState({
          allItems: allItems,
          originalItems: allItems,
        });
      });
  };

  searchItems = (data) => {
    var SearchedData = [];
    var query = this.state.query.toLowerCase();
    console.log("searched");
    for (var i = 0; i < data.length; i++) {
      if (data[i].item_name.toLowerCase().includes(query, 0)) {
        SearchedData.push(data[i]);
      }
    }
    this.setState({
      allItems: SearchedData,
    });
  };

  componentDidMount() {
    this.getAllItems();
  }

  componentWillUnmount() {
    this.itemRef;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={"Price: ₹" + item.price }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
            <View style={{marginRight: 5}}>
            <Icon
              name="minus"
              type="font-awesome"
              onPress={() => {
                item.stock = Number(item.stock)
                item.stock = item.stock - 1;
                this.updateStock(item.stock, item.doc_id);
              }}
            /></View>
            <View style={{marginRight: 5}}>
            <TextInput
              style={{
                width: 45,
                height: 25,
                alignSelf: "center",
                borderColor: "#ffab91",
                borderRadius: 10,
                borderWidth: 1,
              }}
              keyboardType="numeric"
              onChangeText={(text) => {
                item.stock = text;
                this.updateStock(item.stock, item.doc_id);
              }}
              value={item.stock.toString()}
            /></View>
           <Icon
              name="plus"
              type="font-awesome"
              onPress={() => {
                item.stock = Number(item.stock)
                item.stock = item.stock + 1;
                this.updateStock(item.stock, item.doc_id);
              }}
            />
            <View style={{ marginLeft: 30 }}>
              <Icon
                name="trash"
                type="font-awesome"
                onPress={() => {
                  db.collection("all_items").doc(item.doc_id).delete();
                }}
              />
            </View>
          </View>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Stock" navigation={this.props.navigation} />
        <View>
          <SearchBar
            placeholder="Search items..."
            onChangeText={(query) => {
              this.setState({ query: query });
              this.searchItems(this.state.originalItems);
            }}
            value={this.state.query}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.allItems.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of Your Stock</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allItems}
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
