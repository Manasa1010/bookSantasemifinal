import * as React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs"
import BookRequestScreen from "../components/BookRequestScreen"
import BookDonatScreen from "../components/BookDonateScreenScreen"

export const AppTabNavigator = createBottomTabNavigator({


    BookDonatScreen:{screen:BookDonatScreen},
    BookRequestScreen:{screen:BookRequestScreen}
})