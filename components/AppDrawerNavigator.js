import * as React from "react";
import {AppTabNavigator} from "./AppTabNavigator";
import {createDrawerNavigator} from "react-navigation-drawer";
import SideBarMenu from "./SideBarMenu"
import SettingScreen from "../screens/settingScreen";
import NotificationScreen from "../screens/notificationScreen";
import MyDonationScreen from "../screens/myDonationScreen";
import MyReceivedBookScreen from "../screens/myReceivedBookScreen"

export const AppDrawerNavigator=createDrawerNavigator(
    {
        Home:{screen:AppTabNavigator},
        Setting:{screen:SettingScreen},
        notification:{screen:NotificationScreen},
        myDonation:{screen:MyDonationScreen},
        myReceivedBook:{screen:MyReceivedBookScreen}
    },
    {
        contentComponent:SideBarMenu
    },
    {
        initialRouteName:"Home"
    }
)
