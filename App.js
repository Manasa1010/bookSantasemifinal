
import * as  React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./screens/WelcomScreen";
import {createAppContainer,createSwitchNavigator } from "react-navigation";
import {AppTabNavigator} from "./components/AppTabNavigator"

export default class App extends React.Component{
render() {
  return (
    <WelcomeScreen/>
  );
}
}
var SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppTabNavigator:{screen:AppTabNavigator}
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
var container=createAppContainer(SwitchNavigator);