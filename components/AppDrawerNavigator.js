import * as React from "react";
import {AppTabNavigator} from "./AppTabNavigator";
import {createDrawerNavigator} from "react-navigation-drawer";
import SideBarMenu from "./SideBarMenu"
import SettingScreen from "../screens/settingScreen";

export const AppDrawerNavigator=createDrawerNavigator(
    {
        Home:{screen:AppTabNavigator},
        Setting:{screen:SettingScreen}
    },
    {
        contentComponent:SideBarMenu
    },
    {
        initialRouteName:"Home"
    }
)
