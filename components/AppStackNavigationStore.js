import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import OrderedItemsScreen from '../screens/OrderedItemsScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen'

export const AppStackNavigator = createStackNavigator(
  {
    OrdersList: {
      screen: OrderedItemsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OrderDetails: {
      screen: OrderDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "OrdersList",
  }
);
