import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class AddItemScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      storeCity: "",
      itemName: "",
      description: "",
      stock: 0,
      price: 0,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = (itemName, description, stock, price) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("all_items").add({
      user_id: userId,
      item_name: itemName,
      description: description,
      stock: stock,
      item_id: randomRequestId,
      price: price,
      city: this.state.storeCity,
    });

    this.setState({
      itemName: "",
      description: "",
      stock: 0,
      price: 0,
    });

    return alert("Item Added Successfully");
  };

  componentDidMount() {
    db.collection("stores")
      .where("email_id", "==", this.state.userId)
      .get()
      .then((response) => {
        response.docs.map((doc) => {
          this.setState({
            storeCity: doc.data().city,
          });
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Add Item" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Item Name"}
            onChangeText={(text) => {
              this.setState({
                itemName: text,
              });
            }}
            value={this.state.itemName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            multiline
            numberOfLines={8}
            placeholder={"Description"}
            onChangeText={(text) => {
              this.setState({
                description: text,
              });
            }}
            value={this.state.description}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Stock"}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                stock: text,
              });
            }}
            value={this.state.stock}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Price in ₹"}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                price: text,
              });
            }}
            value={this.state.price}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addItem(
                this.state.itemName,
                this.state.description,
                this.state.stock,
                this.state.price
              );
            }}
          >
            <Text>Add Item</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
