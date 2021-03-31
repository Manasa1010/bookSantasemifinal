import * as React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs"
import BookRequestScreen from "../screens/BookRequestScreen"
import {AppStackNavigator} from "./AppStackNavigator"

export const AppTabNavigator = createBottomTabNavigator({


    BookDonatScreen:{screen:AppStackNavigator},
    BookRequestScreen:{screen:BookRequestScreen}
    
})