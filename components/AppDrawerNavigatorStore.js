import React from "react";
import { Icon } from "react-native-elements";
import { createDrawerNavigator } from "react-navigation-drawer";
import NotificationScreen from "../screens/NotificationScreen";
import OrderedItemsScreen from "../screens/OrderedItemsScreen";
import ProfileScreen from "../screens/ProfileScreenStore";
import RequestedItemsScreen from "../screens/RequestedItemsScreen";
import { AppStackNavigator } from "./AppStackNavigationStore";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenuStore";

export const AppDrawerNavigatorStore = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions:{
        drawerIcon: <Icon name="home" type="font-awesome" color="#000" />
      }
    },
    OrderedItems: {
      screen: AppStackNavigator,
      navigationOptions:{
        drawerIcon: <Icon name="shopping-cart" type="font-awesome" color="#000" />,
        drawerLabel: "Ordered Items"
      }
    },
    RequestedItems: {
      screen: RequestedItemsScreen,
      navigationOptions:{
        drawerIcon: <Icon name="shopping-cart" type="font-awesome" color="#000" />,
        drawerLabel: "Requested Items"
      }
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions:{
        drawerIcon: <Icon name="bell" type="font-awesome" color="#000" />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions:{
        drawerIcon: <Icon name="user" type="font-awesome" color="#000" />
      }
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
