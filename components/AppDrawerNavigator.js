import * as React from "react";
import {AppTabNavigator} from "./AppTabNavigator";
import {createDrawerNavigator} from "react-navigation-drawer";
import SideBarMenu from "./SideBarMenu"
import SettingScreen from "../screens/settingScreen";
import NotificationScreen from "../screens/notificationScreen";
import MyDonationScreen from "../screens/myDonationScreen";
import MyReceivedBookScreen from "../screens/myReceivedBookScreen"
import{Icon} from "react-native-elements";

export const AppDrawerNavigator=createDrawerNavigator(
    {
        Home:{ 
            screen:AppTabNavigator,
            navigationOptions:{
                drawerIcon:<Icon name="home" type="fontawesome5"/>
            }
        },
        Setting:{
            screen:SettingScreen,
            navigationOptions:{
                drawerIcon:<Icon name="settings" type="fontawesome5"/>
            }
        },
        notification:{
            screen:NotificationScreen,
            navigationOptions:{
                drawerIcon:<Icon name="bell" type="font-awesome"/>
            }
        },
        myDonation:{
            screen:MyDonationScreen,
            navigationOptions:{
                drawerIcon:<Icon name="gift" type="font-awesome"/>
            }
        },
        myReceivedBook:{
            screen:MyReceivedBookScreen,
            navigationOptions:{
                drawerIcon:<Icon name="gift" type="font-awesome"/>
            }
        }
    },
    {
        contentComponent:SideBarMenu
    },
    {
        initialRouteName:"Home"
    }
)
