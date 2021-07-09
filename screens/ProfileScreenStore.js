import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: "",
      storeType: "",
      emailId: "",
      Building_Street_Locality: "",
      ShopNo: "",
      City: "",
      State: "",
      Country: "",
      contact: "",
      description: "",
      docId: "",
      ordersDocId: [],
      requestsDocId: [],
      itemsDocId: [],
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("stores")
      .where("email_id", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            shopName: data.shop_name,
            storeType: data.store_type,
            description: data.description,
            ShopNo: data.shop_no,
            Building_Street_Locality: data.building_street_locality,
            City: data.city,
            State: data.state,
            Country: data.country,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });

    var ordersDocId = [];
    db.collection("all_orders")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().shop_id === email) {
            ordersDocId.push(doc.id);
          }
        });
      });
    this.setState({
      ordersDocId: ordersDocId,
    });

    var requestsDocId = [];
    db.collection("all_requests")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().shop_id === email) {
            requestsDocId.push(doc.id);
          }
        });
      });
    this.setState({
      requestsDocId: requestsDocId,
    });

    var itemsDocId = [];
    db.collection("all_items")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().user_id === email) {
            itemsDocId.push(doc.id);
          }
        });
      });
    this.setState({
      itemsDocId: itemsDocId,
    });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  updateUserDetails = () => {
    db.collection("stores")
      .doc(this.state.docId)
      .update({
        email_id: this.state.emailId,
        description: this.state.description,
        shop_name: this.state.shopName,
        store_type: this.state.storeType,
        address:
          this.state.ShopNo +
          ", " +
          this.state.Building_Street_Locality +
          ", " +
          this.state.City +
          ", " +
          this.state.State +
          ", " +
          this.state.Country,
        shop_no: this.state.ShopNo,
        building_street_locality: this.state.Building_Street_Locality,
        city: this.state.City,
        state: this.state.State,
        country: this.state.Country,
        contact: this.state.contact,
      });
    for (let i = 0; i < this.state.itemsDocId.length; i++) {
      db.collection("all_items").doc(this.state.itemsDocId[i]).update({
        user_id: this.state.emailId,
      });
    }
    for (let i = 0; i < this.state.ordersDocId.length; i++) {
      db.collection("all_orders").doc(this.state.ordersDocId[i]).update({
        shop_id: this.state.emailId,
        shop_name: this.state.shopName,
      });
    }
    for (let i = 0; i < this.state.requestsDocId.length; i++) {
      db.collection("all_requests").doc(this.state.requestsDocId[i]).update({
        shop_id: this.state.emailId,
        shop_name: this.state.shopName,
      });
    }
    alert("Profile Updated Succesfully");
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Profile" navigation={this.props.navigation} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Shop Name"}
            onChangeText={(text) => {
              this.setState({
                shopName: text,
              });
            }}
            value={this.state.shopName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Store Type"}
            onChangeText={(text) => {
              this.setState({
                storeType: text,
              });
            }}
            value={this.state.storeType}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Shop No."}
            onChangeText={(text) => {
              this.setState({
                ShopNo: text,
              });
            }}
            value={this.state.ShopNo}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Building/Street/Locality"}
            onChangeText={(text) => {
              this.setState({
                Building_Street_Locality: text,
              });
            }}
            value={this.state.Building_Street_Locality}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"City"}
            onChangeText={(text) => {
              this.setState({
                City: text,
              });
            }}
            value={this.state.City}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"State"}
            onChangeText={(text) => {
              this.setState({
                State: text,
              });
            }}
            value={this.state.State}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Country"}
            onChangeText={(text) => {
              this.setState({
                Country: text,
              });
            }}
            value={this.state.Country}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"abc@example.com"}
            keyboardType={"email-address"}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
            value={this.state.emailId}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Description"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                description: text,
              });
            }}
            value={this.state.description}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff9800" }]}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff9800" }]}
            onPress={() => {
              firebase.auth().sendPasswordResetEmail(this.state.emailId);
              alert(
                "Check your Mail Inbox. A Mail is waiting for you from noreply@proud-coral-280616.firebaseapp.com"
              );
            }}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
