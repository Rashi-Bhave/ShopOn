import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import SearchItemsScreen from '../screens/SearchItemsScreen'
import ItemDetailsScreen from '../screens/ItemDetailsScreen'

export const AppStackNavigator = createStackNavigator(
  {
    ItemsList: {
      screen: SearchItemsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ItemDetails: {
      screen: ItemDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "ItemsList",
  }
);
