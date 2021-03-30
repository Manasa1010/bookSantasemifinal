import * as React from "react";
import {AppTabNavigator} from "./AppTabNavigator";
import {createDrawerNavigator} from "react-navigation-drawer";
import SideBarMenu from "./SideBarMenu"
import SettingScreen from "../screens/settingScreen";
import NotificationScreen from "../screens/notificationScreen";
import MyDonationScreen from "../screens/myDonationScreen";

export const AppDrawerNavigator=createDrawerNavigator(
    {
        Home:{screen:AppTabNavigator},
        Setting:{screen:SettingScreen},
        notification:{screen:NotificationScreen},
        myDonation:{screen:MyDonationScreen}
    },
    {
        contentComponent:SideBarMenu
    },
    {
        initialRouteName:"Home"
    }
)
