import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AddItemScreen from "../screens/AddItemScreen";
import MyStockScreen from "../screens/MyStockScreen";

export const AppTabNavigator = createBottomTabNavigator({
  MyStock: {
    screen: MyStockScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/mystock.gif")}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: "My Stock",
    },
  },
  AddItem: {
    screen: AddItemScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/AddItem.gif")}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: "Add Item",
    },
  },
});
