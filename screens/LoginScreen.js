import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

import db from "../config";
import firebase from "firebase";
import { Header, Icon } from "react-native-elements";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      shopName: "",
      description: "",
      firstName: "",
      lastName: "",
      Flat_HouseNo_Floor_Building: "",
      Colony_Street_Locality: "",
      City: "",
      State: "",
      Country: "",
      contact: "",
      Building_Street_Locality: "",
      ShopNo: "",
      confirmPassword: "",
      isModalVisible: "false",
      storeType: "",
      status: this.props.navigation.getParam("status"),
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      if (this.state.status === "Customer") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailId, password)
          .then(() => {
            db.collection("customers").add({
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              contact: this.state.contact,
              email_id: this.state.emailId,
              address:
                this.state.Flat_HouseNo_Floor_Building +
                ", " +
                this.state.Colony_Street_Locality +
                ", " +
                this.state.City +
                ", " +
                this.state.State +
                ", " +
                this.state.Country,
              flat_houseNo_floor_building: this.state
                .Flat_HouseNo_Floor_Building,
              colony_street_locality: this.state.Colony_Street_Locality,
              city: this.state.City,
              state: this.state.State,
              country: this.state.Country,
            });

            this.setState({ isModalVisible: false });
            firebase
              .auth()
              .signInWithEmailAndPassword(emailId, password)
              .then(() => {
                this.props.navigation.navigate("CustomerDrawer");
              });
            return alert("User Added Successfully");
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage);
          });
      } else if (this.state.status === "Store") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailId, password)
          .then(() => {
            db.collection("stores").add({
              shop_name: this.state.shopName,
              store_type: this.state.storeType,
              description: this.state.description,
              contact: this.state.contact,
              email_id: this.state.emailId,
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
            });
            this.setState({ isModalVisible: false });
            firebase
              .auth()
              .signInWithEmailAndPassword(emailId, password)
              .then(() => {
                this.props.navigation.navigate("StoreDrawer");
              });
            return alert("User Added Successfully");
          })

          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage);
          });
      }
    }
  };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        alert("LogIn Successfull");

        if (this.state.status === "Customer") {
          console.log("Working");
          this.props.navigation.navigate("CustomerDrawer");
        } else {
          this.props.navigation.navigate("StoreDrawer");
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  showModal = () => {
    if (this.state.status === "Customer") {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={{ width: "100%" }}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style={styles.modalTitle}>Registration</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"First Name"}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Last Name"}
                  onChangeText={(text) => {
                    this.setState({
                      lastName: text,
                    });
                  }}
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
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Flat/House No./Floor/Building"}
                  onChangeText={(text) => {
                    this.setState({
                      Flat_HouseNo_Floor_Building: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Colony/Street/Locality"}
                  onChangeText={(text) => {
                    this.setState({
                      Colony_Street_Locality: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"City"}
                  onChangeText={(text) => {
                    this.setState({
                      City: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"State"}
                  onChangeText={(text) => {
                    this.setState({
                      State: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Country"}
                  onChangeText={(text) => {
                    this.setState({
                      Country: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  onChangeText={(text) => {
                    this.setState({
                      emailId: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Confrim Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                />
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() =>
                      this.userSignUp(
                        this.state.emailId,
                        this.state.password,
                        this.state.confirmPassword
                      )
                    }
                  >
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => this.setState({ isModalVisible: false })}
                  >
                    <Text style={{ color: "#ff5722" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      );
    } else if (this.state.status === "Store") {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={{ width: "100%" }}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style={styles.modalTitle}>Registration</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Shop Name"}
                  onChangeText={(text) => {
                    this.setState({
                      shopName: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Store Type"}
                  onChangeText={(text) => {
                    this.setState({
                      storeType: text,
                    });
                  }}
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
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Shop No."}
                  onChangeText={(text) => {
                    this.setState({
                      ShopNo: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Building/Street/Locality"}
                  onChangeText={(text) => {
                    this.setState({
                      Building_Street_Locality: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"City"}
                  onChangeText={(text) => {
                    this.setState({
                      City: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"State"}
                  onChangeText={(text) => {
                    this.setState({
                      State: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Country"}
                  onChangeText={(text) => {
                    this.setState({
                      Country: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  onChangeText={(text) => {
                    this.setState({
                      emailId: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder={"Confrim Password"}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                />
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() =>
                      this.userSignUp(
                        this.state.emailId,
                        this.state.password,
                        this.state.confirmPassword
                      )
                    }
                  >
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => this.setState({ isModalVisible: false })}
                  >
                    <Text style={{ color: "#ff5722" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}></View>
        {this.showModal()}
        <View style={styles.profileContainer}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#fff"
                onPress={() => this.props.navigation.navigate("WelcomeScreen")}
              />
            }
            centerComponent={{
              text: this.state.status + " LogIn",
              style: {
                color: "#fff",
                fontSize: 25,
                fontWeight: "bold",
              },
            }}
            backgroundColor="#ff9800"
          />
          <Image
            source={require("../assets/ShopOn.gif")}
            style={{
              width: 400,
              height: 400,
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
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
  profileContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff9800",
    fontWeight: "bold",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff9800",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5e4d5",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
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
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
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
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
});
