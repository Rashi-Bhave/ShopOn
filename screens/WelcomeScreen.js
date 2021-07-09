import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "" };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>ShopOn</Text>
          <Image
            source={require("../assets/ShopOn.gif")}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.button, { margin: 30 }]}
            onPress={() => {
              this.props.navigation.navigate("LogInScreen", {
                status: "Customer",
              });
            }}
          >
            <Image
              source={require("../assets/customer.png")}
              style={styles.buttonImage}
            />
            <Text>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { margin: 30 }]}
            onPress={() => {
              this.props.navigation.navigate("LogInScreen", {
                status: "Store",
              });
            }}
          >
            <Image
              source={require("../assets/store.png")}
              style={styles.buttonImage}
            />
            <Text>Store</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff9800",
    alignSelf: "center",
    fontWeight: "bold",
  },
  button: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
});
