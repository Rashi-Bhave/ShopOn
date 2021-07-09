import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { Switch } from "react-native-switch";
import firebase from "firebase";

export default class SearchItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      query: "",
      originalData: [],
      data:[],
      switchValue: false,
      city: "",
    };
  }
  updateSwitch = (value) => {
    this.setState({
      switchValue: value,
    });
    var list = [];
    if (value === true) {
      for (var i = 0; i < this.state.fullData.length; i++) {
        console.log(this.state.city);
        var data1 = this.state.fullData[i].city.toLowerCase();
        if (data1 === this.state.city.toLowerCase()) {
          list.push(this.state.fullData[i]);
        }
      }
   
    this.setState({
      fullData: list,
    }); 
  } else {
this.setState({
  fullData: this.state.data,
})
  }
  };

  getUserCity = () => {
    db.collection("customers")
      .where("email_id", "==", firebase.auth().currentUser.email)
      .get()
      .then((response) => {
        response.docs.map((doc) => {
          this.setState({ city: doc.data().city.toLowerCase() });
        });
      });
  };

  searchItems = (data) => {
    console.log(data);
    var SearchedData = [];
    var query = this.state.query.toLowerCase();
    var NewData = [];

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var data1 = data[i].item_name.toLowerCase();
      if (data1.includes(query, 0)) {
        SearchedData.push(data[i]);
      }
    }
    this.setState({
      fullData: SearchedData,
      data:SearchedData 
    });
    if (this.state.switchValue === true) {
      for (var i = 0; i < SearchedData.length; i++) {
        console.log(SearchedData[i]);
        var data1 = SearchedData[i].city.toLowerCase();
        if (data1 === this.state.city.toLowerCase()) {
          NewData.push(SearchedData[i]);
        }
      }
      this.setState({
        fullData: NewData,
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={"Price: ₹" + item.price}
        rightElement={
          <Icon
            name="chevron-right"
            type="font-awesome"
            color="#696969"
            onPress={() => {
              this.props.navigation.navigate("ItemDetails", {
                details: item,
              });
            }}
          />
        }
        bottomDivider
      />
    );
  };

  componentDidMount() {
    var allData = db.collection("all_items").onSnapshot((snapshot) => {
      var data = snapshot.docs.map((doc) => doc.data());
      this.setState({
        fullData: data,
        originalData: data,
        data: data,
      });
    });
    this.getUserCity();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Search Items" navigation={this.props.navigation} />
        <View>
          <SearchBar
            placeholder="Search items..."
            onChangeText={(query) => {
              this.setState({ query: query });
              this.searchItems(this.state.originalData);
            }}
            value={this.state.query}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            backgroundColor: "#FFC801",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 20, color:"#fff", fontWeight: "bold" }}>
            Match City:{"   "}
          </Text>
          <Switch
            onValueChange={this.updateSwitch}
            switchRightPx={5}
            switchLeftPx={5}
            value={this.state.switchValue}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.fullData.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Item found</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.fullData}
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
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
