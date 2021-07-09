import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppDrawerNavigatorCustomer } from "./components/AppDrawerNavigatorCustomer";
import { AppDrawerNavigatorStore } from "./components/AppDrawerNavigatorStore";
import { AppStackNavigator } from "./components/AppStackNavigationCustomer";
import { AppTabNavigator } from "./components/AppTabNavigator";
import LogInScreen from "./screens/LoginScreen";
import SearchItemsScreen from "./screens/SearchItemsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  LogInScreen: { screen: LogInScreen },
  CustomerDrawer: { screen: AppDrawerNavigatorCustomer},
  StoreDrawer:{screen: AppDrawerNavigatorStore},
});

const AppContainer = createAppContainer(SwitchNavigator);
