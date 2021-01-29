import * as React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs"
import BookRequestScreen from "../screens/BookRequestScreen"
import BookDonatScreen from "../screens/BookDonateScreenScreen"

export const AppTabNavigator = createBottomTabNavigator({


    BookDonatScreen:{screen:BookDonatScreen},
    BookRequestScreen:{screen:BookRequestScreen}
    
})