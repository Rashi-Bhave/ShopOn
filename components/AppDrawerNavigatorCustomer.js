import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppStackNavigator } from "./AppStackNavigationCustomer";
import CustomSideBarMenu from "./CustomSideBarMenuCustomer";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import MyRequestsScreen from "../screens/MyRequestsScreen";
import ProfileScreen from "../screens/ProfileScreenCustomer";
import NotificationScreen from "../screens/NotificationScreen";
import { Icon } from "react-native-elements";

export const AppDrawerNavigatorCustomer = createDrawerNavigator(
  {
    Home: {
      screen: AppStackNavigator,
      navigationOptions:{
        drawerIcon: <Icon name="home" type="font-awesome" color="#000"/>,
        tabBarOptions: {
          activeTintColor: '#FFBF00',
      }
      },
    },

    MyOrders: {
      screen: MyOrdersScreen,
      navigationOptions:{
        drawerIcon: <Icon name="shopping-cart" type="font-awesome" color="#000"/>,
        drawerLabel: "My Orders",
        tabBarOptions:{
          inactiveTintColor: "#FFBF00"
        }
      }
    },
    MyRequests: {
      screen: MyRequestsScreen,
      navigationOptions:{
        drawerIcon: <Icon name="shopping-cart" type="font-awesome" color="#000"/>,
        drawerLabel: "My Requests",
        tabBarOptions:{
          inactiveTintColor: "#FFBF00"
        }
      }
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions:{
        drawerIcon: <Icon name="bell" type="font-awesome" color="#000"/>,
        tabBarOptions:{
          inactiveTintColor: "#FFBF00"
        }
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions:{
        drawerIcon: <Icon name="user" type="font-awesome" color="#000"/>,
        tabBarOptions:{
          inactiveTintColor: "#FFBF00"
        }
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
