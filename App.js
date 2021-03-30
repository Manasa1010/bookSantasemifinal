
import * as  React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./screens/WelcomScreen";
import {createAppContainer,createSwitchNavigator } from "react-navigation";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator"

export default class App extends React.Component{
render() {
  return (
    <AppContainer/>
  );
}
}
var SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppDrawerNavigator:{screen:AppDrawerNavigator}
})

var AppContainer=createAppContainer(SwitchNavigator);











